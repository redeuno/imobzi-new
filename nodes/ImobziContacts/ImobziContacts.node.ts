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

export class ImobziContacts implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Contacts',
		name: 'imobziContacts',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Gerenciar Contatos, Leads, Pessoas e Organizações na API Imobzi',
		defaults: {
			name: 'Imobzi Contacts',
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
						name: 'Contato',
						value: 'contact',
						description: 'Listar e buscar contatos',
					},
					{
						name: 'Pessoa',
						value: 'person',
						description: 'Gerenciar pessoas físicas',
					},
					{
						name: 'Lead',
						value: 'lead',
						description: 'Gerenciar leads',
					},
					{
						name: 'Organização',
						value: 'organization',
						description: 'Gerenciar empresas/organizações',
					},
					{
						name: 'Tag de Contato',
						value: 'contactTag',
						description: 'Gerenciar tags de contatos',
					},
					{
						name: 'Campo Personalizado - Pessoa',
						value: 'personField',
						description: 'Gerenciar campos customizados de pessoa',
					},
					{
						name: 'Campo Personalizado - Organização',
						value: 'organizationField',
						description: 'Gerenciar campos customizados de organização',
					},
				],
				default: 'contact',
			},

			// ==================== CONTACT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Listar',
						value: 'getAll',
						description: 'Listar todos os contatos',
						action: 'Listar contatos',
					},
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar contatos com filtros',
						action: 'Buscar contatos',
					},
					{
						name: 'Verificar Existência',
						value: 'exists',
						description: 'Verificar se contato existe por email, CPF, CNPJ ou telefone',
						action: 'Verificar se contato existe',
					},
					{
						name: 'Obter Foto de Perfil',
						value: 'getProfilePicture',
						description: 'Obter foto de perfil por email',
						action: 'Obter foto de perfil',
					},
					{
						name: 'Obter Dados Bancários',
						value: 'getBankData',
						description: 'Obter dados bancários do contato',
						action: 'Obter dados bancários',
					},
				],
				default: 'getAll',
			},

			// ==================== PERSON ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['person'],
					},
				},
				options: [
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova pessoa',
						action: 'Criar pessoa',
					},
					{
						name: 'Obter por ID',
						value: 'get',
						description: 'Obter pessoa por ID',
						action: 'Obter pessoa por ID',
					},
					{
						name: 'Obter por Código',
						value: 'getByCode',
						description: 'Obter pessoa por código',
						action: 'Obter pessoa por código',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar pessoa existente',
						action: 'Atualizar pessoa',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar pessoa',
						action: 'Deletar pessoa',
					},
				],
				default: 'get',
			},

			// ==================== LEAD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['lead'],
					},
				},
				options: [
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo lead',
						action: 'Criar lead',
					},
					{
						name: 'Criar via Integração',
						value: 'createIntegration',
						description: 'Criar lead via integração externa',
						action: 'Criar lead via integração',
					},
					{
						name: 'Obter por ID',
						value: 'get',
						description: 'Obter lead por ID',
						action: 'Obter lead por ID',
					},
					{
						name: 'Obter por Código',
						value: 'getByCode',
						description: 'Obter lead por código',
						action: 'Obter lead por código',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar lead existente',
						action: 'Atualizar lead',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar lead',
						action: 'Deletar lead',
					},
				],
				default: 'get',
			},

			// ==================== ORGANIZATION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organization'],
					},
				},
				options: [
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova organização',
						action: 'Criar organização',
					},
					{
						name: 'Obter por ID',
						value: 'get',
						description: 'Obter organização por ID',
						action: 'Obter organização por ID',
					},
					{
						name: 'Obter por Código',
						value: 'getByCode',
						description: 'Obter organização por código',
						action: 'Obter organização por código',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar organização existente',
						action: 'Atualizar organização',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar organização',
						action: 'Deletar organização',
					},
				],
				default: 'get',
			},

			// ==================== CONTACT TAG ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contactTag'],
					},
				},
				options: [
					{
						name: 'Listar',
						value: 'getAll',
						description: 'Listar todas as tags',
						action: 'Listar tags',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova tag',
						action: 'Criar tag',
					},
					{
						name: 'Obter por ID',
						value: 'get',
						description: 'Obter tag por ID',
						action: 'Obter tag por ID',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar tag existente',
						action: 'Atualizar tag',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar tag',
						action: 'Deletar tag',
					},
				],
				default: 'getAll',
			},

			// ==================== PERSON FIELD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['personField'],
					},
				},
				options: [
					{
						name: 'Listar',
						value: 'getAll',
						description: 'Listar todos os campos',
						action: 'Listar campos de pessoa',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo campo',
						action: 'Criar campo de pessoa',
					},
					{
						name: 'Obter por ID',
						value: 'get',
						description: 'Obter campo por ID',
						action: 'Obter campo de pessoa',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar campo existente',
						action: 'Atualizar campo de pessoa',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar campo',
						action: 'Deletar campo de pessoa',
					},
				],
				default: 'getAll',
			},

			// ==================== ORGANIZATION FIELD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organizationField'],
					},
				},
				options: [
					{
						name: 'Listar',
						value: 'getAll',
						description: 'Listar todos os campos',
						action: 'Listar campos de organização',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo campo',
						action: 'Criar campo de organização',
					},
					{
						name: 'Obter por ID',
						value: 'get',
						description: 'Obter campo por ID',
						action: 'Obter campo de organização',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar campo existente',
						action: 'Atualizar campo de organização',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar campo',
						action: 'Deletar campo de organização',
					},
				],
				default: 'getAll',
			},

			// ==================== CAMPOS COMUNS ====================

			// ID fields
			{
				displayName: 'ID da Pessoa',
				name: 'personId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID da pessoa no Imobzi',
			},
			{
				displayName: 'Código da Pessoa',
				name: 'personCode',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['getByCode'],
					},
				},
				default: '',
				description: 'Código da pessoa no Imobzi',
			},
			{
				displayName: 'ID do Lead',
				name: 'leadId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['lead'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID do lead no Imobzi',
			},
			{
				displayName: 'Código do Lead',
				name: 'leadCode',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['lead'],
						operation: ['getByCode'],
					},
				},
				default: '',
				description: 'Código do lead no Imobzi',
			},
			{
				displayName: 'ID da Organização',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID da organização no Imobzi',
			},
			{
				displayName: 'Código da Organização',
				name: 'organizationCode',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['getByCode'],
					},
				},
				default: '',
				description: 'Código da organização no Imobzi',
			},
			{
				displayName: 'ID da Tag',
				name: 'tagId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contactTag'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID da tag no Imobzi',
			},
			{
				displayName: 'ID do Campo',
				name: 'fieldId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['personField', 'organizationField'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID do campo personalizado no Imobzi',
			},
			{
				displayName: 'ID do Contato',
				name: 'contactId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getBankData'],
					},
				},
				default: '',
				description: 'ID do contato no Imobzi',
			},
			{
				displayName: 'Tipo do Contato',
				name: 'contactType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getBankData'],
					},
				},
				options: [
					{ name: 'Pessoa', value: 'person' },
					{ name: 'Organização', value: 'organization' },
				],
				default: 'person',
				description: 'Tipo do contato',
			},

			// Email para foto de perfil
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'nome@email.com',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getProfilePicture'],
					},
				},
				default: '',
				description: 'Email do contato para buscar foto de perfil',
			},

			// Verificar existência
			{
				displayName: 'Buscar Por',
				name: 'existsBy',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['exists'],
					},
				},
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'Telefone', value: 'phone_number' },
					{ name: 'CPF', value: 'cpf' },
					{ name: 'CNPJ', value: 'cnpj' },
				],
				default: 'email',
				description: 'Campo para verificar existência',
			},
			{
				displayName: 'Valor',
				name: 'existsValue',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['exists'],
					},
				},
				default: '',
				description: 'Valor para buscar',
			},

			// ==================== FILTROS PARA LISTAGEM ====================
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getAll', 'search'],
					},
				},
				options: [
					{
						displayName: 'Tipo de Contato',
						name: 'contact_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pessoa', value: 'person' },
							{ name: 'Organização', value: 'organization' },
							{ name: 'Lead', value: 'lead' },
						],
						default: '',
						description: 'Filtrar por tipo de contato',
					},
					{
						displayName: 'Origem (Media Source)',
						name: 'media_source',
						type: 'string',
						default: '',
						description: 'Filtrar por origem do contato',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Filtrar por tags (separadas por vírgula)',
					},
					{
						displayName: 'Texto de Busca',
						name: 'search_text',
						type: 'string',
						default: '',
						description: 'Texto para buscar nos contatos',
					},
					{
						displayName: 'ID do Gerente',
						name: 'manager_id',
						type: 'string',
						default: '',
						description: 'Filtrar por gerente responsável',
					},
					{
						displayName: 'Inativos',
						name: 'inactive',
						type: 'boolean',
						default: false,
						description: 'Whether to include inactive contacts',
					},
					{
						displayName: 'Ordenação',
						name: 'order',
						type: 'options',
						options: [
							{ name: 'Mais Recentes', value: 'desc' },
							{ name: 'Mais Antigos', value: 'asc' },
						],
						default: 'desc',
						description: 'Ordenação dos resultados',
					},
					{
						displayName: 'Data Inicial',
						name: 'start_date',
						type: 'dateTime',
						default: '',
						description: 'Filtrar a partir desta data',
					},
					{
						displayName: 'Data Final',
						name: 'end_date',
						type: 'dateTime',
						default: '',
						description: 'Filtrar até esta data',
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

			// Person Create/Update
			{
				displayName: 'Dados da Pessoa',
				name: 'personData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome Completo',
						name: 'fullname',
						type: 'string',
						default: '',
						description: 'Nome completo da pessoa',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Email principal',
					},
					{
						displayName: 'Telefone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Telefone principal',
					},
					{
						displayName: 'CPF',
						name: 'cpf',
						type: 'string',
						default: '',
						description: 'CPF da pessoa',
					},
					{
						displayName: 'RG',
						name: 'rg',
						type: 'string',
						default: '',
						description: 'RG da pessoa',
					},
					{
						displayName: 'Data de Nascimento',
						name: 'birthday',
						type: 'dateTime',
						default: '',
						description: 'Data de nascimento',
					},
					{
						displayName: 'Profissão',
						name: 'profession',
						type: 'string',
						default: '',
						description: 'Profissão da pessoa',
					},
					{
						displayName: 'Estado Civil',
						name: 'marital_status',
						type: 'options',
						options: [
							{ name: 'Solteiro(a)', value: 'single' },
							{ name: 'Casado(a)', value: 'married' },
							{ name: 'Divorciado(a)', value: 'divorced' },
							{ name: 'Viúvo(a)', value: 'widowed' },
							{ name: 'União Estável', value: 'stable_union' },
						],
						default: 'single',
						description: 'Estado civil',
					},
					{
						displayName: 'Nacionalidade',
						name: 'nationality',
						type: 'string',
						default: 'Brasileiro(a)',
						description: 'Nacionalidade',
					},
					{
						displayName: 'Endereço',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Endereço completo',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Cidade',
					},
					{
						displayName: 'Estado',
						name: 'state',
						type: 'string',
						default: '',
						description: 'Estado (UF)',
					},
					{
						displayName: 'CEP',
						name: 'zipcode',
						type: 'string',
						default: '',
						description: 'CEP',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Tags separadas por vírgula',
					},
					{
						displayName: 'Observações',
						name: 'notes',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'Observações adicionais',
					},
				],
			},

			// Lead Create/Update
			{
				displayName: 'Dados do Lead',
				name: 'leadData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['lead'],
						operation: ['create', 'update', 'createIntegration'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do lead',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Email do lead',
					},
					{
						displayName: 'Telefone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Telefone do lead',
					},
					{
						displayName: 'Origem',
						name: 'media_source',
						type: 'string',
						default: '',
						description: 'Origem do lead (ex: site, portal, indicação)',
					},
					{
						displayName: 'Interesse',
						name: 'interest',
						type: 'options',
						options: [
							{ name: 'Compra', value: 'buy' },
							{ name: 'Aluguel', value: 'rent' },
							{ name: 'Compra ou Aluguel', value: 'both' },
						],
						default: 'rent',
						description: 'Tipo de interesse',
					},
					{
						displayName: 'Mensagem',
						name: 'message',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'Mensagem ou observações do lead',
					},
					{
						displayName: 'ID do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'ID do imóvel de interesse',
					},
					{
						displayName: 'ID do Pipeline',
						name: 'pipeline_id',
						type: 'string',
						default: '',
						description: 'ID do pipeline para o lead',
					},
					{
						displayName: 'ID do Responsável',
						name: 'manager_id',
						type: 'string',
						default: '',
						description: 'ID do usuário responsável',
					},
				],
			},

			// Organization Create/Update
			{
				displayName: 'Dados da Organização',
				name: 'organizationData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Razão Social',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Razão social da empresa',
					},
					{
						displayName: 'Nome Fantasia',
						name: 'trade_name',
						type: 'string',
						default: '',
						description: 'Nome fantasia',
					},
					{
						displayName: 'CNPJ',
						name: 'cnpj',
						type: 'string',
						default: '',
						description: 'CNPJ da empresa',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Email principal',
					},
					{
						displayName: 'Telefone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Telefone principal',
					},
					{
						displayName: 'Endereço',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Endereço da empresa',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Cidade',
					},
					{
						displayName: 'Estado',
						name: 'state',
						type: 'string',
						default: '',
						description: 'Estado (UF)',
					},
					{
						displayName: 'CEP',
						name: 'zipcode',
						type: 'string',
						default: '',
						description: 'CEP',
					},
					{
						displayName: 'Inscrição Estadual',
						name: 'state_registration',
						type: 'string',
						default: '',
						description: 'Inscrição estadual',
					},
					{
						displayName: 'Inscrição Municipal',
						name: 'municipal_registration',
						type: 'string',
						default: '',
						description: 'Inscrição municipal',
					},
					{
						displayName: 'Observações',
						name: 'notes',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'Observações adicionais',
					},
				],
			},

			// Tag Create/Update
			{
				displayName: 'Dados da Tag',
				name: 'tagData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['contactTag'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome da tag',
					},
					{
						displayName: 'Cor',
						name: 'color',
						type: 'color',
						default: '#3498db',
						description: 'Cor da tag',
					},
				],
			},

			// Field Create/Update
			{
				displayName: 'Dados do Campo',
				name: 'fieldData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['personField', 'organizationField'],
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
							{ name: 'Múltipla Seleção', value: 'multiselect' },
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
					{
						displayName: 'Opções (para select/multiselect)',
						name: 'options',
						type: 'string',
						default: '',
						description: 'Opções separadas por vírgula',
					},
				],
			},

			// Retornar todos os resultados
			{
				displayName: 'Retornar Todos',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getAll', 'search'],
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
						resource: ['contact'],
						operation: ['getAll', 'search'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},
		],
	};

	methods = {
		loadOptions: {
			async getContactTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: 'https://api.imobzi.app/v1/contacts/tags',
							json: true,
						},
					);
					const tags = Array.isArray(response) ? response : response.tags || [];
					for (const tag of tags) {
						returnData.push({
							name: tag.name,
							value: tag.db_id || tag.id,
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

				// ==================== CONTACT ====================
				if (resource === 'contact') {
					if (operation === 'getAll') {
						endpoint = '/v1/contacts';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'search') {
						endpoint = '/v1/contacts/search';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'exists') {
						endpoint = '/v1/contact/exists';
						const existsBy = this.getNodeParameter('existsBy', i) as string;
						const existsValue = this.getNodeParameter('existsValue', i) as string;
						qs[existsBy] = existsValue;
					} else if (operation === 'getProfilePicture') {
						endpoint = '/v1/contacts/profile-picture';
						const email = this.getNodeParameter('email', i) as string;
						qs.email = email;
					} else if (operation === 'getBankData') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const contactType = this.getNodeParameter('contactType', i) as string;
						endpoint = `/v1/contact/${contactId}/bank-data`;
						qs.contact_type = contactType;
					}
				}

				// ==================== PERSON ====================
				else if (resource === 'person') {
					if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/persons';
						body = this.getNodeParameter('personData', i, {}) as IDataObject;
					} else if (operation === 'get') {
						const personId = this.getNodeParameter('personId', i) as string;
						endpoint = `/v1/person/${personId}`;
					} else if (operation === 'getByCode') {
						const personCode = this.getNodeParameter('personCode', i) as string;
						endpoint = `/v1/person/code/${personCode}`;
					} else if (operation === 'update') {
						method = 'POST';
						const personId = this.getNodeParameter('personId', i) as string;
						endpoint = `/v1/person/${personId}`;
						body = this.getNodeParameter('personData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const personId = this.getNodeParameter('personId', i) as string;
						endpoint = `/v1/person/${personId}`;
					}
				}

				// ==================== LEAD ====================
				else if (resource === 'lead') {
					if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/leads';
						body = this.getNodeParameter('leadData', i, {}) as IDataObject;
					} else if (operation === 'createIntegration') {
						method = 'POST';
						endpoint = '/v1/integration/lead';
						body = this.getNodeParameter('leadData', i, {}) as IDataObject;
					} else if (operation === 'get') {
						const leadId = this.getNodeParameter('leadId', i) as string;
						endpoint = `/v1/lead/${leadId}`;
					} else if (operation === 'getByCode') {
						const leadCode = this.getNodeParameter('leadCode', i) as string;
						endpoint = `/v1/lead/code/${leadCode}`;
					} else if (operation === 'update') {
						method = 'POST';
						const leadId = this.getNodeParameter('leadId', i) as string;
						endpoint = `/v1/lead/${leadId}`;
						body = this.getNodeParameter('leadData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const leadId = this.getNodeParameter('leadId', i) as string;
						endpoint = `/v1/lead/${leadId}`;
					}
				}

				// ==================== ORGANIZATION ====================
				else if (resource === 'organization') {
					if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/organizations';
						body = this.getNodeParameter('organizationData', i, {}) as IDataObject;
					} else if (operation === 'get') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						endpoint = `/v1/organization/${organizationId}`;
					} else if (operation === 'getByCode') {
						const organizationCode = this.getNodeParameter('organizationCode', i) as string;
						endpoint = `/v1/organization/code/${organizationCode}`;
					} else if (operation === 'update') {
						method = 'POST';
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						endpoint = `/v1/organization/${organizationId}`;
						body = this.getNodeParameter('organizationData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						endpoint = `/v1/organization/${organizationId}`;
					}
				}

				// ==================== CONTACT TAG ====================
				else if (resource === 'contactTag') {
					if (operation === 'getAll') {
						endpoint = '/v1/contacts/tags';
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/contacts/tags';
						body = this.getNodeParameter('tagData', i, {}) as IDataObject;
					} else if (operation === 'get') {
						const tagId = this.getNodeParameter('tagId', i) as string;
						endpoint = `/v1/contact/tags/${tagId}`;
					} else if (operation === 'update') {
						method = 'POST';
						const tagId = this.getNodeParameter('tagId', i) as string;
						endpoint = `/v1/contact/tags/${tagId}`;
						body = this.getNodeParameter('tagData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const tagId = this.getNodeParameter('tagId', i) as string;
						endpoint = `/v1/contact/tags/${tagId}`;
					}
				}

				// ==================== PERSON FIELD ====================
				else if (resource === 'personField') {
					if (operation === 'getAll') {
						endpoint = '/v1/person-fields';
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/person-fields';
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'get') {
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/person-field/${fieldId}`;
					} else if (operation === 'update') {
						method = 'POST';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/person-field/${fieldId}`;
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/person-field/${fieldId}`;
					}
				}

				// ==================== ORGANIZATION FIELD ====================
				else if (resource === 'organizationField') {
					if (operation === 'getAll') {
						endpoint = '/v1/organization-fields';
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/organization-fields';
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'get') {
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/organization-field/${fieldId}`;
					} else if (operation === 'update') {
						method = 'POST';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/organization-field/${fieldId}`;
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/organization-field/${fieldId}`;
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

				// Processar resposta
				if (resource === 'contact' && (operation === 'getAll' || operation === 'search')) {
					// Resposta com lista de contatos
					const contacts = response.contacts || [];
					if (Array.isArray(contacts)) {
						for (const contact of contacts) {
							returnData.push({ json: contact });
						}
					}
					// Adicionar metadados de paginação
					if (response.cursor || response.count) {
						returnData.push({
							json: {
								_pagination: {
									cursor: response.cursor,
									count: response.count,
									count_pending: response.count_pending,
								},
							},
						});
					}
				} else if (Array.isArray(response)) {
					// Resposta é array direto
					for (const item of response) {
						returnData.push({ json: item });
					}
				} else {
					// Resposta é objeto único
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
