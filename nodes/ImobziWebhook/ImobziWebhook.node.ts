import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';

export class ImobziWebhook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Webhook',
		name: 'imobziWebhook',
		icon: 'file:imobzi.svg',
		group: ['trigger'],
		version: 1,
		description: 'Recebe eventos da API Imobzi via Webhook',
		subtitle: '={{$parameter["event"]}}',
		defaults: {
			name: 'Imobzi Webhook',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'imobziApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'imobzi-webhook',
			},
		],
		properties: [
			{
				displayName: 'Eventos',
				name: 'event',
				type: 'multiOptions',
				options: [
					// Contacts
					{ name: 'Contato Criado', value: 'contact.created' },
					{ name: 'Contato Atualizado', value: 'contact.updated' },
					{ name: 'Contato Deletado', value: 'contact.deleted' },
					// Leads
					{ name: 'Lead Criado', value: 'lead.created' },
					{ name: 'Lead Atualizado', value: 'lead.updated' },
					{ name: 'Lead Deletado', value: 'lead.deleted' },
					// Properties
					{ name: 'Imóvel Criado', value: 'property.created' },
					{ name: 'Imóvel Atualizado', value: 'property.updated' },
					{ name: 'Imóvel Deletado', value: 'property.deleted' },
					// Deals
					{ name: 'Negócio Criado', value: 'deal.created' },
					{ name: 'Negócio Atualizado', value: 'deal.updated' },
					{ name: 'Negócio Deletado', value: 'deal.deleted' },
					{ name: 'Negócio Movido De Etapa', value: 'deal.stage_changed' },
					{ name: 'Negócio Ganho', value: 'deal.won' },
					{ name: 'Negócio Perdido', value: 'deal.lost' },
					// Contracts
					{ name: 'Contrato Criado', value: 'contract.created' },
					{ name: 'Contrato Atualizado', value: 'contract.updated' },
					{ name: 'Contrato Deletado', value: 'contract.deleted' },
					// Leases
					{ name: 'Locação Criada', value: 'lease.created' },
					{ name: 'Locação Atualizada', value: 'lease.updated' },
					{ name: 'Locação Deletada', value: 'lease.deleted' },
					// Documents
					{ name: 'Documento Criado', value: 'document.created' },
					{ name: 'Documento Atualizado', value: 'document.updated' },
					{ name: 'Documento Deletado', value: 'document.deleted' },
					// Calendar/Tasks
					{ name: 'Evento Criado', value: 'calendar.created' },
					{ name: 'Evento Atualizado', value: 'calendar.updated' },
					{ name: 'Evento Deletado', value: 'calendar.deleted' },
					{ name: 'Tarefa Criada', value: 'task.created' },
					{ name: 'Tarefa Atualizada', value: 'task.updated' },
					{ name: 'Tarefa Completada', value: 'task.completed' },
					// Financial
					{ name: 'Transação Criada', value: 'transaction.created' },
					{ name: 'Transação Atualizada', value: 'transaction.updated' },
					{ name: 'Fatura Criada', value: 'invoice.created' },
					{ name: 'Fatura Paga', value: 'invoice.paid' },
					// Visits
					{ name: 'Visita Agendada', value: 'visit.scheduled' },
					{ name: 'Visita Confirmada', value: 'visit.confirmed' },
					{ name: 'Visita Cancelada', value: 'visit.cancelled' },
					{ name: 'Visita Realizada', value: 'visit.completed' },
					// All Events
					{ name: 'Todos Os Eventos', value: '*' },
				],
				default: [],
				description: 'Selecione os tipos de eventos para acionar o webhook. Deixe vazio para receber todos.',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Ignore SSL Issues',
						name: 'ignoreSsl',
						type: 'boolean',
						default: false,
						description: 'Whether to ignore SSL certificate issues',
					},
					{
						displayName: 'Raw Data',
						name: 'rawData',
						type: 'boolean',
						default: false,
						description: 'Whether to return the raw webhook payload without processing',
					},
				],
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = req.body as IDataObject;
		const selectedEvents = this.getNodeParameter('event', []) as string[];
		const options = this.getNodeParameter('options', {}) as IDataObject;

		// Se rawData está habilitado, retorna o payload completo
		if (options.rawData) {
			return {
				workflowData: [
					this.helpers.returnJsonArray([body]),
				],
			};
		}

		// Extrai informações do webhook
		const eventType = (body.event || body.type || body.action || 'unknown') as string;
		const eventData = body.data || body.payload || body;
		const timestamp = body.timestamp || body.created_at || new Date().toISOString();

		// Filtra por eventos selecionados (se houver)
		if (selectedEvents.length > 0 && !selectedEvents.includes('*')) {
			const matchesEvent = selectedEvents.some(selected => {
				// Verifica match exato ou por prefixo (ex: "contact.*" matches "contact.created")
				if (selected.endsWith('.*')) {
					const prefix = selected.slice(0, -2);
					return eventType.startsWith(prefix);
				}
				return eventType === selected;
			});

			if (!matchesEvent) {
				// Evento não está na lista de selecionados, ignora
				return {
					workflowData: [],
				};
			}
		}

		// Estrutura padronizada do output
		const outputData: IDataObject = {
			event: eventType,
			timestamp,
			data: eventData,
			raw: body,
			webhook_received_at: new Date().toISOString(),
		};

		return {
			workflowData: [
				this.helpers.returnJsonArray([outputData]),
			],
		};
	}
}
