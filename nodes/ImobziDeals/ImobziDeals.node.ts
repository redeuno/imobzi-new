import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class ImobziDeals implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Deals',
		name: 'imobziDeals',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Gerenciar Deals, Pipelines, Filtros e Propostas na API Imobzi',
		defaults: {
			name: 'Imobzi Deals',
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
					{
						name: 'Deal',
						value: 'deal',
						description: 'Gerenciar negócios/oportunidades',
					},
					{
						name: 'Pipeline',
						value: 'pipeline',
						description: 'Gerenciar pipelines de vendas',
					},
					{
						name: 'Grupo De Pipeline',
						value: 'pipelineGroup',
						description: 'Gerenciar grupos de pipeline',
					},
					{
						name: 'Campo De Deal',
						value: 'dealField',
						description: 'Gerenciar campos customizados de deal',
					},
					{
						name: 'Motivo De Perda',
						value: 'dealLostReason',
						description: 'Gerenciar motivos de perda de deal',
					},
					{
						name: 'Filtro De Deal',
						value: 'dealFilter',
						description: 'Gerenciar filtros salvos de deals',
					},
					{
						name: 'Rotação De Deal',
						value: 'dealRotation',
						description: 'Gerenciar rotação de deals entre usuários',
					},
					{
						name: 'Proposta',
						value: 'proposal',
						description: 'Consultar propostas de deals e imóveis',
					},
				],
				default: 'deal',
			},

			// ==================== DEAL ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['deal'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os deals por estágio',
						action: 'Listar deals',
					},
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar deals com filtros',
						action: 'Buscar deals',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter deal por ID',
						action: 'Obter deal por ID',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo deal',
						action: 'Criar deal',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar deal existente',
						action: 'Atualizar deal',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar deal',
						action: 'Deletar deal',
					},
					{
						name: 'Obter Imóveis Compatíveis',
						value: 'getPropertiesMatch',
						description: 'Obter imóveis compatíveis com o deal',
						action: 'Obter im veis compat veis',
					},
					{
						name: 'Obter Faixas de Valor',
						value: 'getRangeValues',
						description: 'Obter faixas de valores para deals',
						action: 'Obter faixas de valor',
					},
					{
						name: 'Obter Faixas De Área',
						value: 'getRangeAreas',
						description: 'Obter faixas de áreas para deals',
						action: 'Obter faixas de rea',
					},
					{
						name: 'Relatório De Concluídos',
						value: 'getDealsDone',
						description: 'Obter relatório de deals concluídos',
						action: 'Relat rio de conclu dos',
					},
				],
				default: 'getAll',
			},

			// ==================== PIPELINE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pipeline'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os pipelines',
						action: 'Listar pipelines',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter pipeline por ID',
						action: 'Obter pipeline',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo pipeline',
						action: 'Criar pipeline',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar pipeline existente',
						action: 'Atualizar pipeline',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar pipeline',
						action: 'Deletar pipeline',
					},
				],
				default: 'getAll',
			},

			// ==================== PIPELINE GROUP ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pipelineGroup'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os grupos',
						action: 'Listar grupos de pipeline',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter grupo por ID',
						action: 'Obter grupo',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo grupo',
						action: 'Criar grupo',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar grupo existente',
						action: 'Atualizar grupo',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar grupo',
						action: 'Deletar grupo',
					},
				],
				default: 'getAll',
			},

			// ==================== DEAL FIELD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dealField'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os campos',
						action: 'Listar campos de deal',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter campo por ID',
						action: 'Obter campo',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo campo',
						action: 'Criar campo',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar campo existente',
						action: 'Atualizar campo',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar campo',
						action: 'Deletar campo',
					},
				],
				default: 'getAll',
			},

			// ==================== DEAL LOST REASON ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dealLostReason'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os motivos',
						action: 'Listar motivos de perda',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter motivo por ID',
						action: 'Obter motivo',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo motivo',
						action: 'Criar motivo',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar motivo existente',
						action: 'Atualizar motivo',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar motivo',
						action: 'Deletar motivo',
					},
				],
				default: 'getAll',
			},

			// ==================== DEAL FILTER ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dealFilter'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os filtros',
						action: 'Listar filtros',
					},
					{
						name: 'Listar Campos De Filtro',
						value: 'getFilterFields',
						description: 'Listar campos disponíveis para filtro',
						action: 'Listar campos de filtro',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo filtro',
						action: 'Criar filtro',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar filtro existente',
						action: 'Atualizar filtro',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar filtro',
						action: 'Deletar filtro',
					},
				],
				default: 'getAll',
			},

			// ==================== DEAL ROTATION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dealRotation'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as rotações',
						action: 'Listar rota es',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter rotação por ID',
						action: 'Obter rota o',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova rotação',
						action: 'Criar rota o',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar rotação existente',
						action: 'Atualizar rota o',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar rotação',
						action: 'Deletar rota o',
					},
				],
				default: 'getAll',
			},

			// ==================== PROPOSAL ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['proposal'],
					},
				},
				options: [
					{
						name: 'Listar Propostas De Deal',
						value: 'getDealProposals',
						description: 'Listar propostas de deals',
						action: 'Listar propostas de deal',
					},
					{
						name: 'Obter Proposta De Deal',
						value: 'getDealProposal',
						description: 'Obter proposta específica de um deal',
						action: 'Obter proposta de deal',
					},
					{
						name: 'Listar Propostas De Imóvel',
						value: 'getPropertyProposals',
						description: 'Listar propostas por imóvel',
						action: 'Listar propostas de im vel',
					},
				],
				default: 'getDealProposals',
			},

			// ==================== CAMPOS DE ID ====================
			{
				displayName: 'ID Do Deal',
				name: 'dealId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['get', 'update', 'delete', 'getPropertiesMatch'],
					},
				},
				default: '',
				description: 'ID do deal no Imobzi',
			},
			{
				displayName: 'Chave Do Deal',
				name: 'dealKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['proposal'],
						operation: ['getDealProposal'],
					},
				},
				default: '',
				description: 'Chave do deal para proposta',
			},
			{
				displayName: 'ID Do Pipeline',
				name: 'pipelineId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['pipeline'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Do Grupo De Pipeline',
				name: 'pipelineGroupId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['pipelineGroup'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Do Campo',
				name: 'fieldId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['dealField'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID do campo de deal',
			},
			{
				displayName: 'ID Do Motivo',
				name: 'reasonId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['dealLostReason'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID do motivo de perda',
			},
			{
				displayName: 'ID Do Filtro',
				name: 'filterId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['dealFilter'],
						operation: ['update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Rotação',
				name: 'rotationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['dealRotation'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},

			// ==================== FILTROS PARA DEAL ====================
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['getAll', 'search'],
					},
				},
				options: [
					{
						displayName: 'ID Do Pipeline',
						name: 'pipeline_id',
						type: 'string',
						default: '',
						description: 'Filtrar por pipeline',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Aberto', value: 'open' },
							{ name: 'Ganho', value: 'won' },
							{ name: 'Perdido', value: 'lost' },
						],
						default: '',
						description: 'Status do deal',
					},
					{
						displayName: 'Tipo De Interesse',
						name: 'interest_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Compra', value: 'buy' },
							{ name: 'Aluguel', value: 'rent' },
						],
						default: '',
					},
					{
						displayName: 'ID Do Responsável',
						name: 'manager_id',
						type: 'string',
						default: '',
						description: 'ID do usuário responsável',
					},
					{
						displayName: 'ID Do Contato',
						name: 'contact_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Texto De Busca',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Texto para buscar',
					},
					{
						displayName: 'Valor Mínimo',
						name: 'min_value',
						type: 'number',
						default: 0,
						description: 'Valor mínimo do deal',
					},
					{
						displayName: 'Valor Máximo',
						name: 'max_value',
						type: 'number',
						default: 0,
						description: 'Valor máximo do deal',
					},
					{
						displayName: 'Data Inicial',
						name: 'start_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Data Final',
						name: 'end_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Filtrar por cidade',
					},
					{
						displayName: 'Bairro',
						name: 'neighborhood',
						type: 'string',
						default: '',
						description: 'Filtrar por bairro',
					},
					{
						displayName: 'Cursor (Paginação)',
						name: 'cursor',
						type: 'string',
						default: '',
						description: 'Cursor para paginação',
					},
				],
			},

			// ==================== DADOS PARA CRIAR/ATUALIZAR ====================

			// Deal Create/Update
			{
				displayName: 'Dados Do Deal',
				name: 'dealData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Título',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Título do deal',
					},
					{
						displayName: 'ID Do Contato',
						name: 'contact_id',
						type: 'string',
						default: '',
						description: 'ID do contato associado',
					},
					{
						displayName: 'ID Do Pipeline',
						name: 'pipeline_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Estágio',
						name: 'stage_id',
						type: 'string',
						default: '',
						description: 'ID do estágio no pipeline',
					},
					{
						displayName: 'Tipo De Interesse',
						name: 'interest_type',
						type: 'options',
						options: [
							{ name: 'Compra', value: 'buy' },
							{ name: 'Aluguel', value: 'rent' },
						],
						default: 'rent',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Valor do deal',
					},
					{
						displayName: 'ID Do Responsável',
						name: 'manager_id',
						type: 'string',
						default: '',
						description: 'ID do usuário responsável',
					},
					{
						displayName: 'Origem',
						name: 'media_source',
						type: 'string',
						default: '',
						description: 'Origem do deal',
					},
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'ID do imóvel relacionado',
					},
					{
						displayName: 'Quartos (Mínimo)',
						name: 'min_bedrooms',
						type: 'number',
						default: 0,
						description: 'Número mínimo de quartos desejados',
					},
					{
						displayName: 'Quartos (Máximo)',
						name: 'max_bedrooms',
						type: 'number',
						default: 0,
						description: 'Número máximo de quartos desejados',
					},
					{
						displayName: 'Valor Mínimo',
						name: 'min_value',
						type: 'number',
						default: 0,
						description: 'Valor mínimo de interesse',
					},
					{
						displayName: 'Valor Máximo',
						name: 'max_value',
						type: 'number',
						default: 0,
						description: 'Valor máximo de interesse',
					},
					{
						displayName: 'Cidades De Interesse',
						name: 'cities',
						type: 'string',
						default: '',
						description: 'Cidades de interesse (separadas por vírgula)',
					},
					{
						displayName: 'Bairros De Interesse',
						name: 'neighborhoods',
						type: 'string',
						default: '',
						description: 'Bairros de interesse (separados por vírgula)',
					},
					{
						displayName: 'Observações',
						name: 'notes',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'Observações do deal',
					},
				],
			},

			// Pipeline Create/Update
			{
				displayName: 'Dados Do Pipeline',
				name: 'pipelineData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['pipeline'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do pipeline',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição do pipeline',
					},
					{
						displayName: 'Posição',
						name: 'position',
						type: 'number',
						default: 1,
						description: 'Posição de ordenação',
					},
					{
						displayName: 'Dias Estagnado',
						name: 'stagnant_days',
						type: 'number',
						default: 1,
						description: 'Dias para considerar deal estagnado',
					},
					{
						displayName: 'Radar Habilitado',
						name: 'radar_enabled',
						type: 'boolean',
						default: false,
						description: 'Whether radar is enabled',
					},
					{
						displayName: 'Reservas Do Site',
						name: 'site_reserves',
						type: 'boolean',
						default: false,
						description: 'Whether site reserves are enabled',
					},
				],
			},

			// Pipeline Group Create/Update
			{
				displayName: 'Dados Do Grupo',
				name: 'pipelineGroupData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['pipelineGroup'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do grupo',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição do grupo',
					},
				],
			},

			// Deal Field Create/Update
			{
				displayName: 'Dados Do Campo',
				name: 'fieldData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['dealField'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do campo',
					},
					{
						displayName: 'Tipo',
						name: 'field_type',
						type: 'options',
						options: [
							{ name: 'Texto', value: 'text' },
							{ name: 'Número', value: 'number' },
							{ name: 'Data', value: 'date' },
							{ name: 'Seleção', value: 'select' },
							{ name: 'Checkbox', value: 'checkbox' },
						],
						default: 'text',
						description: 'Tipo do campo',
					},
					{
						displayName: 'Obrigatório',
						name: 'required',
						type: 'boolean',
						default: false,
						description: 'Whether the field is required',
					},
				],
			},

			// Deal Lost Reason Create/Update
			{
				displayName: 'Dados Do Motivo',
				name: 'reasonData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['dealLostReason'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do motivo',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição do motivo',
					},
				],
			},

			// Deal Filter Create/Update
			{
				displayName: 'Dados Do Filtro',
				name: 'filterData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['dealFilter'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do filtro',
					},
					{
						displayName: 'Condições (JSON)',
						name: 'conditions',
						type: 'json',
						default: '{}',
						description: 'Condições do filtro em JSON',
					},
				],
			},

			// Deal Rotation Create/Update
			{
				displayName: 'Dados Da Rotação',
				name: 'rotationData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['dealRotation'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome da rotação',
					},
					{
						displayName: 'IDs Dos Usuários',
						name: 'user_ids',
						type: 'string',
						default: '',
						description: 'IDs dos usuários na rotação (separados por vírgula)',
					},
					{
						displayName: 'Ativo',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Whether the rotation is active',
					},
				],
			},

			// Retornar todos
			{
				displayName: 'Retornar Todos',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['deal', 'pipeline', 'pipelineGroup', 'dealField', 'dealLostReason', 'dealFilter', 'dealRotation'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limite',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['deal', 'pipeline', 'pipelineGroup', 'dealField', 'dealLostReason', 'dealFilter', 'dealRotation'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
		],
	};

	methods = {
		loadOptions: {
			async getPipelines(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: 'https://api.imobzi.app/v1/pipelines',
							json: true,
						},
					);
					const pipelines = Array.isArray(response) ? response : [];
					for (const pipeline of pipelines) {
						returnData.push({
							name: pipeline.name,
							value: pipeline.db_id,
						});
					}
				} catch (error) {
					// Return empty if error
				}
				return returnData;
			},
			async getDealLostReasons(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: 'https://api.imobzi.app/v1/deal/lost-reason',
							json: true,
						},
					);
					const reasons = Array.isArray(response) ? response : response.reasons || [];
					for (const reason of reasons) {
						returnData.push({
							name: reason.name,
							value: reason.db_id || reason.id,
						});
					}
				} catch (error) {
					// Return empty if error
				}
				return returnData;
			},
		},
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

				// ==================== DEAL ====================
				if (resource === 'deal') {
					if (operation === 'getAll') {
						endpoint = '/v1/deals';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'search') {
						endpoint = '/v1/deals/search';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'get') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						endpoint = `/v1/deal/${dealId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/deals';
						body = this.getNodeParameter('dealData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const dealId = this.getNodeParameter('dealId', i) as string;
						endpoint = `/v1/deal/${dealId}`;
						body = this.getNodeParameter('dealData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const dealId = this.getNodeParameter('dealId', i) as string;
						endpoint = `/v1/deal/${dealId}`;
					} else if (operation === 'getPropertiesMatch') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						endpoint = `/v1/deal/${dealId}/properties-match`;
					} else if (operation === 'getRangeValues') {
						endpoint = '/v1/deal/range-values';
					} else if (operation === 'getRangeAreas') {
						endpoint = '/v1/deal/range-areas';
					} else if (operation === 'getDealsDone') {
						endpoint = '/v1/reports/deals-done';
					}
				}

				// ==================== PIPELINE ====================
				else if (resource === 'pipeline') {
					if (operation === 'getAll') {
						endpoint = '/v1/pipelines';
					} else if (operation === 'get') {
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						endpoint = `/v1/pipeline/${pipelineId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/pipelines';
						body = this.getNodeParameter('pipelineData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						endpoint = `/v1/pipeline/${pipelineId}`;
						body = this.getNodeParameter('pipelineData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						endpoint = `/v1/pipeline/${pipelineId}`;
					}
				}

				// ==================== PIPELINE GROUP ====================
				else if (resource === 'pipelineGroup') {
					if (operation === 'getAll') {
						endpoint = '/v1/pipeline-groups';
					} else if (operation === 'get') {
						const groupId = this.getNodeParameter('pipelineGroupId', i) as string;
						endpoint = `/v1/pipeline-groups/${groupId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/pipeline-groups';
						body = this.getNodeParameter('pipelineGroupData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const groupId = this.getNodeParameter('pipelineGroupId', i) as string;
						endpoint = `/v1/pipeline-groups/${groupId}`;
						body = this.getNodeParameter('pipelineGroupData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const groupId = this.getNodeParameter('pipelineGroupId', i) as string;
						endpoint = `/v1/pipeline-groups/${groupId}`;
					}
				}

				// ==================== DEAL FIELD ====================
				else if (resource === 'dealField') {
					if (operation === 'getAll') {
						endpoint = '/v1/deal-fields';
					} else if (operation === 'get') {
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/deal-field/${fieldId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/deal-fields';
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/deal-field/${fieldId}`;
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/deal-field/${fieldId}`;
					}
				}

				// ==================== DEAL LOST REASON ====================
				else if (resource === 'dealLostReason') {
					if (operation === 'getAll') {
						endpoint = '/v1/deal/lost-reason';
					} else if (operation === 'get') {
						const reasonId = this.getNodeParameter('reasonId', i) as string;
						endpoint = `/v1/deal/lost-reason/${reasonId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/deal/lost-reason';
						body = this.getNodeParameter('reasonData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const reasonId = this.getNodeParameter('reasonId', i) as string;
						endpoint = `/v1/deal/lost-reason/${reasonId}`;
						body = this.getNodeParameter('reasonData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const reasonId = this.getNodeParameter('reasonId', i) as string;
						endpoint = `/v1/deal/lost-reason/${reasonId}`;
					}
				}

				// ==================== DEAL FILTER ====================
				else if (resource === 'dealFilter') {
					if (operation === 'getAll') {
						endpoint = '/v1/deal/filters';
					} else if (operation === 'getFilterFields') {
						endpoint = '/v1/deal/filter-fields';
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/deal/filters';
						body = this.getNodeParameter('filterData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const filterId = this.getNodeParameter('filterId', i) as string;
						endpoint = `/v1/deal/filter/${filterId}`;
						body = this.getNodeParameter('filterData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const filterId = this.getNodeParameter('filterId', i) as string;
						endpoint = `/v1/deal/filter/${filterId}`;
					}
				}

				// ==================== DEAL ROTATION ====================
				else if (resource === 'dealRotation') {
					if (operation === 'getAll') {
						endpoint = '/v1/deals-rotations';
					} else if (operation === 'get') {
						const rotationId = this.getNodeParameter('rotationId', i) as string;
						endpoint = `/v1/deal-rotation/${rotationId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/deals-rotations';
						body = this.getNodeParameter('rotationData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const rotationId = this.getNodeParameter('rotationId', i) as string;
						endpoint = `/v1/deal-rotation/${rotationId}`;
						body = this.getNodeParameter('rotationData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const rotationId = this.getNodeParameter('rotationId', i) as string;
						endpoint = `/v1/deal-rotation/${rotationId}`;
					}
				}

				// ==================== PROPOSAL ====================
				else if (resource === 'proposal') {
					if (operation === 'getDealProposals') {
						endpoint = '/v1/proposal/deal';
					} else if (operation === 'getDealProposal') {
						const dealKey = this.getNodeParameter('dealKey', i) as string;
						endpoint = `/v1/proposal/deal/${dealKey}`;
					} else if (operation === 'getPropertyProposals') {
						endpoint = '/v1/proposal/property';
					}
				}

				// Fazer a requisição
				const requestOptions: IHttpRequestOptions = {
					method,
					url: `https://api.imobzi.app${endpoint}`,
					qs,
					json: true,
				};

				if (method === 'POST' && Object.keys(body).length > 0) {
					requestOptions.body = body;
				}

				const response = await this.helpers.requestWithAuthentication.call(
					this,
					'imobziApi',
					requestOptions,
				);

				// Processar resposta especial de deals (por estágio)
				if (resource === 'deal' && operation === 'getAll') {
					// Deals vem agrupado por stage_id
					const stages = Object.keys(response).filter(
						(key) => !['cursor_all_stages', 'total_pages', 'total_values', 'total_deals'].includes(key),
					);
					for (const stageId of stages) {
						const stageData = response[stageId];
						if (stageData && stageData.deals) {
							for (const deal of stageData.deals) {
								returnData.push({
									json: {
										...deal,
										_stage_id: stageId,
										_stage_name: stageData.stage_name,
									},
								});
							}
						}
					}
					// Adicionar metadados
					returnData.push({
						json: {
							_metadata: {
								cursor_all_stages: response.cursor_all_stages,
								total_pages: response.total_pages,
								total_values: response.total_values,
								total_deals: response.total_deals,
							},
						},
					});
				} else if (Array.isArray(response)) {
					for (const item of response) {
						returnData.push({ json: item });
					}
				} else {
					returnData.push({ json: response });
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: i,
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error.message, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
