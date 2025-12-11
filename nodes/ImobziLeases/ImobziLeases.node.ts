import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class ImobziLeases implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Leases',
		name: 'imobziLeases',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Gerenciar Locações, Contratos, Seguros e Acordos na API Imobzi',
		defaults: {
			name: 'Imobzi Leases',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'imobziApi',
				required: true,
			},
		],
		properties: [
			// Resource
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Locação', value: 'lease', description: 'Gerenciar locações' },
					{ name: 'Contrato', value: 'contract', description: 'Gerenciar contratos de venda' },
					{ name: 'Campo De Locação', value: 'leaseField', description: 'Campos customizados de locação' },
					{ name: 'Campo De Contrato', value: 'contractField', description: 'Campos customizados de contrato' },
					{ name: 'Seguro', value: 'insurance', description: 'Gerenciar seguros de locação' },
					{ name: 'Acordo', value: 'agreement', description: 'Criar acordos de locação' },
					{ name: 'Cálculo', value: 'calculate', description: 'Calcular valores de locação' },
					{ name: 'Checklist', value: 'checklist', description: 'Checklist de locação' },
					{ name: 'Descrição De Item', value: 'itemDescription', description: 'Descrições de itens de locação' },
					{ name: 'Reajuste Anual', value: 'annualReadjustment', description: 'Consultar reajustes anuais' },
				],
				default: 'lease',
			},

			// ==================== LEASE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['lease'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', description: 'Listar todas as locações', action: 'Listar loca es' },
					{ name: 'Obter Por ID', value: 'get', description: 'Obter locação por ID', action: 'Obter loca o' },
					{ name: 'Obter Por Código', value: 'getByCode', description: 'Obter locação por código', action: 'Obter por c digo' },
					{ name: 'Criar', value: 'create', description: 'Criar nova locação', action: 'Criar loca o' },
					{ name: 'Atualizar', value: 'update', description: 'Atualizar locação', action: 'Atualizar loca o' },
					{ name: 'Deletar', value: 'delete', description: 'Deletar locação', action: 'Deletar loca o' },
				],
				default: 'getAll',
			},

			// ==================== CONTRACT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['contract'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', description: 'Listar todos os contratos', action: 'Listar contratos' },
					{ name: 'Obter Por ID', value: 'get', description: 'Obter contrato por ID', action: 'Obter contrato' },
					{ name: 'Obter Por Código', value: 'getByCode', description: 'Obter contrato por código', action: 'Obter por c digo' },
					{ name: 'Criar', value: 'create', description: 'Criar novo contrato', action: 'Criar contrato' },
					{ name: 'Atualizar', value: 'update', description: 'Atualizar contrato', action: 'Atualizar contrato' },
					{ name: 'Deletar', value: 'delete', description: 'Deletar contrato', action: 'Deletar contrato' },
				],
				default: 'getAll',
			},

			// ==================== LEASE FIELD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['leaseField'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Listar campos de loca o' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter campo' },
					{ name: 'Criar', value: 'create', action: 'Criar campo' },
					{ name: 'Atualizar', value: 'update', action: 'Atualizar campo' },
					{ name: 'Deletar', value: 'delete', action: 'Deletar campo' },
				],
				default: 'getAll',
			},

			// ==================== CONTRACT FIELD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['contractField'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Listar campos de contrato' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter campo' },
					{ name: 'Criar', value: 'create', action: 'Criar campo' },
					{ name: 'Atualizar', value: 'update', action: 'Atualizar campo' },
					{ name: 'Deletar', value: 'delete', action: 'Deletar campo' },
				],
				default: 'getAll',
			},

			// ==================== INSURANCE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['insurance'] } },
				options: [
					{ name: 'Calcular', value: 'calculate', description: 'Calcular seguro', action: 'Calcular seguro' },
					{ name: 'Contratar', value: 'hire', description: 'Contratar seguro', action: 'Contratar seguro' },
					{ name: 'Cancelar', value: 'cancel', description: 'Cancelar seguro', action: 'Cancelar seguro' },
					{ name: 'Não Cancelar', value: 'noCancellation', description: 'Reverter cancelamento', action: 'Reverter cancelamento' },
				],
				default: 'calculate',
			},

			// ==================== AGREEMENT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['agreement'] } },
				options: [
					{ name: 'Criar Acordo', value: 'create', description: 'Criar acordo de locação', action: 'Criar acordo' },
				],
				default: 'create',
			},

			// ==================== CALCULATE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['calculate'] } },
				options: [
					{ name: 'Calcular Locação', value: 'calculate', description: 'Calcular valores de locação', action: 'Calcular loca o' },
				],
				default: 'calculate',
			},

			// ==================== CHECKLIST ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['checklist'] } },
				options: [
					{ name: 'Obter Padrão', value: 'getDefault', description: 'Obter checklist padrão', action: 'Obter checklist padr o' },
				],
				default: 'getDefault',
			},

			// ==================== ITEM DESCRIPTION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['itemDescription'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', description: 'Listar descrições de itens', action: 'Listar descri es' },
				],
				default: 'getAll',
			},

			// ==================== ANNUAL READJUSTMENT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['annualReadjustment'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', description: 'Listar reajustes anuais', action: 'Listar reajustes' },
					{ name: 'Obter Atual', value: 'getCurrent', description: 'Obter reajuste atual', action: 'Obter reajuste atual' },
				],
				default: 'getAll',
			},

			// ==================== CAMPOS DE ID ====================
			{
				displayName: 'ID Da Locação',
				name: 'leaseId',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['lease'], operation: ['get', 'update', 'delete'] } },
				default: '',
			},
			{
				displayName: 'Código Da Locação',
				name: 'leaseCode',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['lease'], operation: ['getByCode'] } },
				default: '',
			},
			{
				displayName: 'ID Do Contrato',
				name: 'contractId',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['contract'], operation: ['get', 'update', 'delete'] } },
				default: '',
			},
			{
				displayName: 'Código Do Contrato',
				name: 'contractCode',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['contract'], operation: ['getByCode'] } },
				default: '',
			},
			{
				displayName: 'ID Do Campo',
				name: 'fieldId',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['leaseField', 'contractField'], operation: ['get', 'update', 'delete'] } },
				default: '',
			},

			// ==================== FILTROS ====================
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: { show: { resource: ['lease'], operation: ['getAll'] } },
				options: [
					{ displayName: 'Status', name: 'status', type: 'options', options: [
						{ name: 'Todos', value: '' },
						{ name: 'Ativo', value: 'active' },
						{ name: 'Encerrado', value: 'finished' },
						{ name: 'Cancelado', value: 'cancelled' },
					], default: '' },
					{ displayName: 'Tipo', name: 'lease_type', type: 'options', options: [
						{ name: 'Todos', value: '' },
						{ name: 'Residencial', value: 'residential' },
						{ name: 'Comercial', value: 'commercial' },
					], default: '' },
					{ displayName: 'ID Do Imóvel', name: 'property_id', type: 'string', default: '' },
					{ displayName: 'ID Do Proprietário', name: 'landlord_id', type: 'string', default: '' },
					{ displayName: 'ID Do Inquilino', name: 'tenant_id', type: 'string', default: '' },
					{ displayName: 'Cursor', name: 'cursor', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: { show: { resource: ['contract'], operation: ['getAll'] } },
				options: [
					{ displayName: 'Status', name: 'status', type: 'options', options: [
						{ name: 'Todos', value: '' },
						{ name: 'Ativo', value: 'active' },
						{ name: 'Encerrado', value: 'finished' },
						{ name: 'Cancelado', value: 'cancelled' },
					], default: '' },
					{ displayName: 'ID Do Imóvel', name: 'property_id', type: 'string', default: '' },
					{ displayName: 'Cursor', name: 'cursor', type: 'string', default: '' },
				],
			},

			// ==================== DADOS PARA CRIAR/ATUALIZAR ====================
			{
				displayName: 'Dados Da Locação',
				name: 'leaseData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: { show: { resource: ['lease'], operation: ['create', 'update'] } },
				options: [
					{ displayName: 'Código', name: 'code', type: 'string', default: '' },
					{ displayName: 'Tipo', name: 'lease_type', type: 'options', options: [
						{ name: 'Residencial', value: 'residential' },
						{ name: 'Comercial', value: 'commercial' },
					], default: 'residential' },
					{ displayName: 'Valor', name: 'value', type: 'number', default: 0 },
					{ displayName: 'ID Do Imóvel', name: 'property_id', type: 'string', default: '' },
					{ displayName: 'ID Do Proprietário', name: 'landlord_id', type: 'string', default: '' },
					{ displayName: 'ID Do Inquilino', name: 'tenant_id', type: 'string', default: '' },
					{ displayName: 'Data De Início', name: 'start_at', type: 'dateTime', default: '' },
					{ displayName: 'Data De Término', name: 'end_at', type: 'dateTime', default: '' },
					{ displayName: 'Dia De Vencimento', name: 'due_day', type: 'number', default: 5 },
					{ displayName: 'Taxa De Administração (%)', name: 'management_fee', type: 'number', default: 10 },
					{ displayName: 'IRRF', name: 'irrf', type: 'boolean', default: false },
					{ displayName: 'Índice De Reajuste', name: 'readjustment_index', type: 'string', default: 'IGPM' },
				],
			},
			{
				displayName: 'Dados Do Contrato',
				name: 'contractData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: { show: { resource: ['contract'], operation: ['create', 'update'] } },
				options: [
					{ displayName: 'Código', name: 'code', type: 'string', default: '' },
					{ displayName: 'Valor', name: 'value', type: 'number', default: 0 },
					{ displayName: 'ID Do Imóvel', name: 'property_id', type: 'string', default: '' },
					{ displayName: 'ID do Comprador', name: 'buyer_id', type: 'string', default: '' },
					{ displayName: 'ID do Vendedor', name: 'seller_id', type: 'string', default: '' },
					{ displayName: 'Data De Assinatura', name: 'signature_date', type: 'dateTime', default: '' },
					{ displayName: 'Comissão (%)', name: 'commission', type: 'number', default: 6 },
				],
			},
			{
				displayName: 'Dados Do Campo',
				name: 'fieldData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: { show: { resource: ['leaseField', 'contractField'], operation: ['create', 'update'] } },
				options: [
					{ displayName: 'Nome', name: 'name', type: 'string', default: '' },
					{ displayName: 'Tipo', name: 'field_type', type: 'options', options: [
						{ name: 'Texto', value: 'text' },
						{ name: 'Número', value: 'number' },
						{ name: 'Data', value: 'date' },
						{ name: 'Seleção', value: 'select' },
						{ name: 'Checkbox', value: 'checkbox' },
					], default: 'text' },
					{ displayName: 'Obrigatório', name: 'required', type: 'boolean', default: false },
				],
			},
			{
				displayName: 'Dados Do Seguro',
				name: 'insuranceData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: { show: { resource: ['insurance'], operation: ['calculate', 'hire', 'cancel', 'noCancellation'] } },
				options: [
					{ displayName: 'ID Da Locação', name: 'lease_id', type: 'string', default: '' },
					{ displayName: 'Valor Do Aluguel', name: 'rental_value', type: 'number', default: 0 },
					{ displayName: 'Tipo De Imóvel', name: 'property_type', type: 'string', default: '' },
					{ displayName: 'CEP', name: 'zipcode', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Dados Do Acordo',
				name: 'agreementData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: { show: { resource: ['agreement'], operation: ['create'] } },
				options: [
					{ displayName: 'ID Da Locação', name: 'lease_id', type: 'string', default: '' },
					{ displayName: 'Valor', name: 'value', type: 'number', default: 0 },
					{ displayName: 'Data De Vencimento', name: 'due_date', type: 'dateTime', default: '' },
					{ displayName: 'Descrição', name: 'description', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Dados Do Cálculo',
				name: 'calculateData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: { show: { resource: ['calculate'], operation: ['calculate'] } },
				options: [
					{ displayName: 'Valor Do Aluguel', name: 'rental_value', type: 'number', default: 0 },
					{ displayName: 'Taxa De Administração (%)', name: 'management_fee', type: 'number', default: 10 },
					{ displayName: 'IRRF', name: 'irrf', type: 'boolean', default: false },
					{ displayName: 'Valor Do Condomínio', name: 'condo_value', type: 'number', default: 0 },
					{ displayName: 'Valor Do IPTU', name: 'iptu_value', type: 'number', default: 0 },
				],
			},

			// Retornar todos
			{
				displayName: 'Retornar Todos',
				name: 'returnAll',
				type: 'boolean',
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: { show: { resource: ['lease', 'contract', 'leaseField', 'contractField', 'annualReadjustment', 'itemDescription'], operation: ['getAll'] } },
				default: false,
			},
			{
				displayName: 'Limite',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				displayOptions: { show: { resource: ['lease', 'contract', 'leaseField', 'contractField', 'annualReadjustment', 'itemDescription'], operation: ['getAll'], returnAll: [false] } },
				default: 50,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let method: 'GET' | 'POST' | 'DELETE' = 'GET';
				let endpoint = '';
				let body: IDataObject = {};
				let qs: IDataObject = {};

				// LEASE
				if (resource === 'lease') {
					if (operation === 'getAll') { endpoint = '/v1/leases'; qs = this.getNodeParameter('filters', i, {}) as IDataObject; }
					else if (operation === 'get') { endpoint = `/v1/lease/${this.getNodeParameter('leaseId', i)}`; }
					else if (operation === 'getByCode') { endpoint = `/v1/lease/code/${this.getNodeParameter('leaseCode', i)}`; }
					else if (operation === 'create') { method = 'POST'; endpoint = '/v1/leases'; body = this.getNodeParameter('leaseData', i, {}) as IDataObject; }
					else if (operation === 'update') { method = 'POST'; endpoint = `/v1/lease/${this.getNodeParameter('leaseId', i)}`; body = this.getNodeParameter('leaseData', i, {}) as IDataObject; }
					else if (operation === 'delete') { method = 'DELETE'; endpoint = `/v1/lease/${this.getNodeParameter('leaseId', i)}`; }
				}
				// CONTRACT
				else if (resource === 'contract') {
					if (operation === 'getAll') { endpoint = '/v1/contracts'; qs = this.getNodeParameter('filters', i, {}) as IDataObject; }
					else if (operation === 'get') { endpoint = `/v1/contract/${this.getNodeParameter('contractId', i)}`; }
					else if (operation === 'getByCode') { endpoint = `/v1/contract/code/${this.getNodeParameter('contractCode', i)}`; }
					else if (operation === 'create') { method = 'POST'; endpoint = '/v1/contracts'; body = this.getNodeParameter('contractData', i, {}) as IDataObject; }
					else if (operation === 'update') { method = 'POST'; endpoint = `/v1/contract/${this.getNodeParameter('contractId', i)}`; body = this.getNodeParameter('contractData', i, {}) as IDataObject; }
					else if (operation === 'delete') { method = 'DELETE'; endpoint = `/v1/contract/${this.getNodeParameter('contractId', i)}`; }
				}
				// LEASE FIELD
				else if (resource === 'leaseField') {
					if (operation === 'getAll') { endpoint = '/v1/lease-fields'; }
					else if (operation === 'get') { endpoint = `/v1/lease-field/${this.getNodeParameter('fieldId', i)}`; }
					else if (operation === 'create') { method = 'POST'; endpoint = '/v1/lease-fields'; body = this.getNodeParameter('fieldData', i, {}) as IDataObject; }
					else if (operation === 'update') { method = 'POST'; endpoint = `/v1/lease-field/${this.getNodeParameter('fieldId', i)}`; body = this.getNodeParameter('fieldData', i, {}) as IDataObject; }
					else if (operation === 'delete') { method = 'DELETE'; endpoint = `/v1/lease-field/${this.getNodeParameter('fieldId', i)}`; }
				}
				// CONTRACT FIELD
				else if (resource === 'contractField') {
					if (operation === 'getAll') { endpoint = '/v1/contract-fields'; }
					else if (operation === 'get') { endpoint = `/v1/contract-field/${this.getNodeParameter('fieldId', i)}`; }
					else if (operation === 'create') { method = 'POST'; endpoint = '/v1/contract-fields'; body = this.getNodeParameter('fieldData', i, {}) as IDataObject; }
					else if (operation === 'update') { method = 'POST'; endpoint = `/v1/contract-field/${this.getNodeParameter('fieldId', i)}`; body = this.getNodeParameter('fieldData', i, {}) as IDataObject; }
					else if (operation === 'delete') { method = 'DELETE'; endpoint = `/v1/contract-field/${this.getNodeParameter('fieldId', i)}`; }
				}
				// INSURANCE
				else if (resource === 'insurance') {
					const insuranceData = this.getNodeParameter('insuranceData', i, {}) as IDataObject;
					if (operation === 'calculate') { endpoint = '/v1/lease/calculate-insurance'; qs = insuranceData; }
					else if (operation === 'hire') { method = 'POST'; endpoint = '/v1/lease/hire-insurance'; body = insuranceData; }
					else if (operation === 'cancel') { method = 'POST'; endpoint = '/v1/lease/cancel-insurance'; body = insuranceData; }
					else if (operation === 'noCancellation') { method = 'POST'; endpoint = '/v1/lease/no-cancellation-insurance'; body = insuranceData; }
				}
				// AGREEMENT
				else if (resource === 'agreement') {
					if (operation === 'create') { method = 'POST'; endpoint = '/v1/lease/agreement'; body = this.getNodeParameter('agreementData', i, {}) as IDataObject; }
				}
				// CALCULATE
				else if (resource === 'calculate') {
					if (operation === 'calculate') { method = 'POST'; endpoint = '/v1/lease/calculate'; body = this.getNodeParameter('calculateData', i, {}) as IDataObject; }
				}
				// CHECKLIST
				else if (resource === 'checklist') {
					if (operation === 'getDefault') { endpoint = '/v1/lease/checklist'; }
				}
				// ITEM DESCRIPTION
				else if (resource === 'itemDescription') {
					if (operation === 'getAll') { endpoint = '/v1/lease/item-description'; }
				}
				// ANNUAL READJUSTMENT
				else if (resource === 'annualReadjustment') {
					if (operation === 'getAll') { endpoint = '/v1/annual-readjustments'; }
					else if (operation === 'getCurrent') { endpoint = '/v1/annual/readjustment'; }
				}

				const requestOptions: IHttpRequestOptions = { method, url: `https://api.imobzi.app${endpoint}`, qs, json: true };
				if (method === 'POST' && Object.keys(body).length > 0) { requestOptions.body = body; }

				const response = await this.helpers.requestWithAuthentication.call(this, 'imobziApi', requestOptions);

				// Processar resposta
				if (resource === 'lease' && operation === 'getAll') {
					const leases = response.leases || [];
					for (const lease of leases) { returnData.push({ json: lease }); }
					if (response.cursor || response.count) { returnData.push({ json: { _pagination: { cursor: response.cursor, count: response.count, value_total: response.value_total } } }); }
				} else if (resource === 'contract' && operation === 'getAll') {
					const contracts = response.contracts || [];
					for (const contract of contracts) { returnData.push({ json: contract }); }
					if (response.cursor || response.count) { returnData.push({ json: { _pagination: { cursor: response.cursor, count: response.count, value_total: response.value_total } } }); }
				} else if (Array.isArray(response)) {
					for (const item of response) { returnData.push({ json: item }); }
				} else {
					returnData.push({ json: response });
				}
			} catch (error: any) {
				if (this.continueOnFail()) { returnData.push({ json: { error: error.message }, pairedItem: i }); continue; }
				throw new NodeOperationError(this.getNode(), error.message, { itemIndex: i });
			}
		}
		return [returnData];
	}
}
