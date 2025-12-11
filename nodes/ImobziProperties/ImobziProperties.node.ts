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

export class ImobziProperties implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Properties',
		name: 'imobziProperties',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Gerenciar Imóveis, Tipos, Características e Fotos na API Imobzi',
		defaults: {
			name: 'Imobzi Properties',
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
						name: 'Imóvel',
						value: 'property',
						description: 'Gerenciar imóveis',
					},
					{
						name: 'Tipo De Imóvel',
						value: 'propertyType',
						description: 'Gerenciar tipos de imóveis',
					},
					{
						name: 'Característica',
						value: 'propertyFeature',
						description: 'Gerenciar características de imóveis',
					},
					{
						name: 'Campo Personalizado',
						value: 'propertyField',
						description: 'Gerenciar campos customizados',
					},
					{
						name: 'Foto',
						value: 'propertyPhoto',
						description: 'Gerenciar fotos de imóveis',
					},
					{
						name: 'Anúncio',
						value: 'propertyAdvert',
						description: 'Gerenciar anúncios de imóveis',
					},
					{
						name: 'Reserva',
						value: 'propertyReserve',
						description: 'Gerenciar reservas de imóveis',
					},
					{
						name: 'Bairro',
						value: 'neighborhood',
						description: 'Gerenciar bairros',
					},
					{
						name: 'Cidade',
						value: 'city',
						description: 'Listar cidades',
					},
					{
						name: 'Estado',
						value: 'state',
						description: 'Listar estados',
					},
				],
				default: 'property',
			},

			// ==================== PROPERTY ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['property'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os imóveis',
						action: 'Listar im veis',
					},
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar imóveis com filtros',
						action: 'Buscar im veis',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter imóvel por ID',
						action: 'Obter im vel por id',
					},
					{
						name: 'Obter Por Código',
						value: 'getByCode',
						description: 'Obter imóvel por código',
						action: 'Obter im vel por c digo',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo imóvel',
						action: 'Criar im vel',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar imóvel existente',
						action: 'Atualizar im vel',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar imóvel',
						action: 'Deletar im vel',
					},
					{
						name: 'Verificar Existência',
						value: 'exists',
						description: 'Verificar se imóvel existe',
						action: 'Verificar exist ncia',
					},
					{
						name: 'Obter Estatísticas',
						value: 'getStatistics',
						description: 'Obter estatísticas do imóvel',
						action: 'Obter estat sticas',
					},
					{
						name: 'Obter Calendário',
						value: 'getCalendar',
						description: 'Obter calendário do imóvel',
						action: 'Obter calend rio',
					},
					{
						name: 'Buscar Por Mapa',
						value: 'getByMap',
						description: 'Buscar imóveis por geolocalização',
						action: 'Buscar por mapa',
					},
					{
						name: 'Match Com Deals',
						value: 'getDealsMatch',
						description: 'Obter deals compatíveis com o imóvel',
						action: 'Match com deals',
					},
				],
				default: 'getAll',
			},

			// ==================== PROPERTY TYPE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyType'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os tipos',
						action: 'Listar tipos de im vel',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter tipo por ID',
						action: 'Obter tipo por ID',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo tipo',
						action: 'Criar tipo',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar tipo existente',
						action: 'Atualizar tipo',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar tipo',
						action: 'Deletar tipo',
					},
				],
				default: 'getAll',
			},

			// ==================== PROPERTY FEATURE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyFeature'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as características',
						action: 'Listar caracter sticas',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter característica por ID',
						action: 'Obter caracter stica por id',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova característica',
						action: 'Criar caracter stica',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar característica existente',
						action: 'Atualizar caracter stica',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar característica',
						action: 'Deletar caracter stica',
					},
				],
				default: 'getAll',
			},

			// ==================== PROPERTY FIELD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyField'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os campos',
						action: 'Listar campos',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter campo por ID',
						action: 'Obter campo por ID',
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

			// ==================== PROPERTY PHOTO ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyPhoto'],
					},
				},
				options: [
					{
						name: 'Adicionar',
						value: 'create',
						description: 'Adicionar foto ao imóvel',
						action: 'Adicionar foto',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar foto existente',
						action: 'Atualizar foto',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar foto do imóvel',
						action: 'Deletar foto',
					},
				],
				default: 'create',
			},

			// ==================== PROPERTY ADVERT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyAdvert'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os anúncios',
						action: 'Listar an ncios',
					},
					{
						name: 'Obter',
						value: 'get',
						description: 'Obter anúncio por chave',
						action: 'Obter an ncio',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo anúncio',
						action: 'Criar an ncio',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar anúncio existente',
						action: 'Atualizar an ncio',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar anúncio',
						action: 'Deletar an ncio',
					},
				],
				default: 'getAll',
			},

			// ==================== PROPERTY RESERVE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyReserve'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as reservas',
						action: 'Listar reservas',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter reserva por ID',
						action: 'Obter reserva',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova reserva',
						action: 'Criar reserva',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar reserva existente',
						action: 'Atualizar reserva',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar reserva',
						action: 'Deletar reserva',
					},
				],
				default: 'getAll',
			},

			// ==================== NEIGHBORHOOD ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['neighborhood'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os bairros',
						action: 'Listar bairros',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter bairro por ID',
						action: 'Obter bairro',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo bairro',
						action: 'Criar bairro',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar bairro existente',
						action: 'Atualizar bairro',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar bairro',
						action: 'Deletar bairro',
					},
				],
				default: 'getAll',
			},

			// ==================== CITY ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['city'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as cidades',
						action: 'Listar cidades',
					},
				],
				default: 'getAll',
			},

			// ==================== STATE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['state'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os estados',
						action: 'Listar estados',
					},
				],
				default: 'getAll',
			},

			// ==================== CAMPOS COMUNS ====================

			// Property IDs
			{
				displayName: 'ID Do Imóvel',
				name: 'propertyId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['get', 'update', 'delete', 'getStatistics', 'getCalendar', 'getDealsMatch'],
					},
				},
				default: '',
				description: 'ID do imóvel no Imobzi',
			},
			{
				displayName: 'Código Do Imóvel',
				name: 'propertyCode',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['getByCode'],
					},
				},
				default: '',
				description: 'Código do imóvel no Imobzi',
			},
			{
				displayName: 'ID Do Imóvel',
				name: 'propertyId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['propertyPhoto'],
						operation: ['create', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID do imóvel no Imobzi',
			},
			{
				displayName: 'ID Da Foto',
				name: 'photoId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['propertyPhoto'],
						operation: ['update', 'delete'],
					},
				},
				default: '',
			},

			// Type/Feature/Field IDs
			{
				displayName: 'ID Do Tipo',
				name: 'typeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['propertyType'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID do tipo de imóvel',
			},
			{
				displayName: 'ID Da Característica',
				name: 'featureId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['propertyFeature'],
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
						resource: ['propertyField'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID do campo personalizado',
			},

			// Advert/Reserve/Neighborhood IDs
			{
				displayName: 'Chave Do Anúncio',
				name: 'advertKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['propertyAdvert'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Reserva',
				name: 'reserveId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['propertyReserve'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Do Bairro',
				name: 'neighborhoodId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['neighborhood'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},

			// ==================== FILTROS PARA PROPERTY ====================
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['getAll', 'search'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Disponível', value: 'available' },
							{ name: 'Alugado', value: 'rented' },
							{ name: 'Vendido', value: 'sold' },
							{ name: 'Reservado', value: 'reserved' },
							{ name: 'Indisponível', value: 'unavailable' },
						],
						default: '',
						description: 'Status do imóvel',
					},
					{
						displayName: 'Finalidade',
						name: 'goal',
						type: 'options',
						options: [
							{ name: 'Todas', value: '' },
							{ name: 'Venda', value: 'sell' },
							{ name: 'Aluguel', value: 'rent' },
							{ name: 'Venda E Aluguel', value: 'both' },
						],
						default: '',
						description: 'Finalidade do imóvel',
					},
					{
						displayName: 'Tipo De Imóvel',
						name: 'property_type',
						type: 'string',
						default: '',
						description: 'Tipo do imóvel',
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
						displayName: 'Valor Mínimo',
						name: 'min_value',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Valor Máximo',
						name: 'max_value',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Quartos (Mínimo)',
						name: 'min_bedrooms',
						type: 'number',
						default: 0,
						description: 'Número mínimo de quartos',
					},
					{
						displayName: 'Área Mínima (M²)',
						name: 'min_area',
						type: 'number',
						default: 0,
						description: 'Área mínima em m²',
					},
					{
						displayName: 'Área Máxima (M²)',
						name: 'max_area',
						type: 'number',
						default: 0,
						description: 'Área máxima em m²',
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

			// Filtros para busca por mapa
			{
				displayName: 'Coordenadas',
				name: 'mapCoordinates',
				type: 'collection',
				placeholder: 'Definir Coordenadas',
				required: true,
				default: {},
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['getByMap'],
					},
				},
				options: [
					{
						displayName: 'Latitude (Norte)',
						name: 'north',
						type: 'number',
						default: 0,
						description: 'Latitude norte do retângulo de busca',
					},
					{
						displayName: 'Latitude (Sul)',
						name: 'south',
						type: 'number',
						default: 0,
						description: 'Latitude sul do retângulo de busca',
					},
					{
						displayName: 'Longitude (Leste)',
						name: 'east',
						type: 'number',
						default: 0,
						description: 'Longitude leste do retângulo de busca',
					},
					{
						displayName: 'Longitude (Oeste)',
						name: 'west',
						type: 'number',
						default: 0,
						description: 'Longitude oeste do retângulo de busca',
					},
				],
			},

			// ==================== DADOS PARA CRIAR/ATUALIZAR ====================

			// Property Create/Update
			{
				displayName: 'Dados Do Imóvel',
				name: 'propertyData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Código',
						name: 'code',
						type: 'string',
						default: '',
						description: 'Código único do imóvel',
					},
					{
						displayName: 'Título',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Título do imóvel',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'Descrição detalhada',
					},
					{
						displayName: 'Tipo',
						name: 'property_type',
						type: 'string',
						default: '',
						description: 'Tipo do imóvel (apartamento, casa, etc)',
					},
					{
						displayName: 'Finalidade',
						name: 'goal',
						type: 'options',
						options: [
							{ name: 'Venda', value: 'sell' },
							{ name: 'Aluguel', value: 'rent' },
							{ name: 'Venda E Aluguel', value: 'both' },
						],
						default: 'rent',
						description: 'Finalidade do imóvel',
					},
					{
						displayName: 'Valor De Venda',
						name: 'sale_value',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Valor De Aluguel',
						name: 'rental_value',
						type: 'number',
						default: 0,
						description: 'Valor do aluguel',
					},
					{
						displayName: 'Endereço',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Endereço do imóvel',
					},
					{
						displayName: 'Número',
						name: 'address_number',
						type: 'string',
						default: '',
						description: 'Número do endereço',
					},
					{
						displayName: 'Complemento',
						name: 'address_complement',
						type: 'string',
						default: '',
						description: 'Complemento do endereço',
					},
					{
						displayName: 'Bairro',
						name: 'neighborhood',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
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
					},
					{
						displayName: 'Área Total (M²)',
						name: 'total_area',
						type: 'number',
						default: 0,
						description: 'Área total em m²',
					},
					{
						displayName: 'Área Útil (M²)',
						name: 'useful_area',
						type: 'number',
						default: 0,
						description: 'Área útil em m²',
					},
					{
						displayName: 'Quartos',
						name: 'bedrooms',
						type: 'number',
						default: 0,
						description: 'Número de quartos',
					},
					{
						displayName: 'Suítes',
						name: 'suites',
						type: 'number',
						default: 0,
						description: 'Número de suítes',
					},
					{
						displayName: 'Banheiros',
						name: 'bathrooms',
						type: 'number',
						default: 0,
						description: 'Número de banheiros',
					},
					{
						displayName: 'Vagas',
						name: 'parking_spaces',
						type: 'number',
						default: 0,
						description: 'Vagas de garagem',
					},
					{
						displayName: 'Latitude',
						name: 'latitude',
						type: 'number',
						default: 0,
						description: 'Latitude para geolocalização',
					},
					{
						displayName: 'Longitude',
						name: 'longitude',
						type: 'number',
						default: 0,
						description: 'Longitude para geolocalização',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Disponível', value: 'available' },
							{ name: 'Alugado', value: 'rented' },
							{ name: 'Vendido', value: 'sold' },
							{ name: 'Reservado', value: 'reserved' },
							{ name: 'Indisponível', value: 'unavailable' },
						],
						default: 'available',
						description: 'Status do imóvel',
					},
					{
						displayName: 'Valor Do Condomínio',
						name: 'condo_value',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Valor Do IPTU',
						name: 'iptu_value',
						type: 'number',
						default: 0,
					},
				],
			},

			// Type/Feature/Field/Neighborhood Data
			{
				displayName: 'Dados Do Tipo',
				name: 'typeData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['propertyType'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do tipo',
					},
					{
						displayName: 'Ícone',
						name: 'icon',
						type: 'string',
						default: '',
						description: 'Ícone do tipo',
					},
				],
			},
			{
				displayName: 'Dados Da Característica',
				name: 'featureData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['propertyFeature'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome da característica',
					},
					{
						displayName: 'Categoria',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Categoria da característica',
					},
				],
			},
			{
				displayName: 'Dados Do Campo',
				name: 'fieldData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['propertyField'],
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
			{
				displayName: 'Dados Do Bairro',
				name: 'neighborhoodData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['neighborhood'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do bairro',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Cidade do bairro',
					},
					{
						displayName: 'Estado',
						name: 'state',
						type: 'string',
						default: '',
						description: 'Estado (UF)',
					},
				],
			},

			// Photo data
			{
				displayName: 'Dados Da Foto',
				name: 'photoData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['propertyPhoto'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'URL Da Imagem',
						name: 'url',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição da foto',
					},
					{
						displayName: 'Posição',
						name: 'position',
						type: 'number',
						default: 0,
						description: 'Posição da foto na galeria',
					},
					{
						displayName: 'É Principal',
						name: 'is_main',
						type: 'boolean',
						default: false,
						description: 'Whether this is the main photo',
					},
				],
			},

			// Advert data
			{
				displayName: 'Dados Do Anúncio',
				name: 'advertData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['propertyAdvert'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Título',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Título do anúncio',
					},
					{
						displayName: 'Portal',
						name: 'portal',
						type: 'string',
						default: '',
						description: 'Portal de anúncio',
					},
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'ID do imóvel para o anúncio',
					},
					{
						displayName: 'Ativo',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Whether the advert is active',
					},
				],
			},

			// Reserve data
			{
				displayName: 'Dados Da Reserva',
				name: 'reserveData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['propertyReserve'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Contato',
						name: 'contact_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Data De Início',
						name: 'start_date',
						type: 'dateTime',
						default: '',
						description: 'Data de início da reserva',
					},
					{
						displayName: 'Data De Fim',
						name: 'end_date',
						type: 'dateTime',
						default: '',
						description: 'Data de fim da reserva',
					},
					{
						displayName: 'Observações',
						name: 'notes',
						type: 'string',
						default: '',
						description: 'Observações da reserva',
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
						resource: ['property', 'propertyType', 'propertyFeature', 'propertyField', 'propertyAdvert', 'propertyReserve', 'neighborhood', 'city', 'state'],
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
						resource: ['property', 'propertyType', 'propertyFeature', 'propertyField', 'propertyAdvert', 'propertyReserve', 'neighborhood', 'city', 'state'],
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
			async getPropertyTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: 'https://api.imobzi.app/v1/property-types',
							json: true,
						},
					);
					const types = Array.isArray(response) ? response : response.property_types || [];
					for (const type of types) {
						returnData.push({
							name: type.name,
							value: type.db_id || type.id,
						});
					}
				} catch (error) {
					// Return empty if error
				}
				return returnData;
			},
			async getNeighborhoods(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: 'https://api.imobzi.app/v1/neighborhoods',
							json: true,
						},
					);
					const neighborhoods = Array.isArray(response) ? response : response.neighborhoods || [];
					for (const neighborhood of neighborhoods) {
						returnData.push({
							name: neighborhood.name,
							value: neighborhood.db_id || neighborhood.id,
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
				let method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET';
				let endpoint = '';
				let body: IDataObject = {};
				let qs: IDataObject = {};

				// ==================== PROPERTY ====================
				if (resource === 'property') {
					if (operation === 'getAll') {
						endpoint = '/v1/properties';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'search') {
						method = 'POST';
						endpoint = '/v1/property/search';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						body = { ...filters };
					} else if (operation === 'get') {
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						endpoint = `/v1/property/${propertyId}`;
					} else if (operation === 'getByCode') {
						const propertyCode = this.getNodeParameter('propertyCode', i) as string;
						endpoint = `/v1/property/code/${propertyCode}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/properties';
						body = this.getNodeParameter('propertyData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						endpoint = `/v1/property/${propertyId}`;
						body = this.getNodeParameter('propertyData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						endpoint = `/v1/property/${propertyId}`;
					} else if (operation === 'exists') {
						endpoint = '/v1/property/exists';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'getStatistics') {
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						endpoint = `/v1/property/${propertyId}/statistics`;
					} else if (operation === 'getCalendar') {
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						endpoint = `/v1/property/${propertyId}/calendar-items`;
					} else if (operation === 'getByMap') {
						endpoint = '/v1/properties/map';
						const coords = this.getNodeParameter('mapCoordinates', i, {}) as IDataObject;
						qs = { ...coords };
					} else if (operation === 'getDealsMatch') {
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						endpoint = `/v1/property/${propertyId}/deals-match`;
					}
				}

				// ==================== PROPERTY TYPE ====================
				else if (resource === 'propertyType') {
					if (operation === 'getAll') {
						endpoint = '/v1/property-types';
					} else if (operation === 'get') {
						const typeId = this.getNodeParameter('typeId', i) as string;
						endpoint = `/v1/property-types/${typeId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/property-types';
						body = this.getNodeParameter('typeData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const typeId = this.getNodeParameter('typeId', i) as string;
						endpoint = `/v1/property-types/${typeId}`;
						body = this.getNodeParameter('typeData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const typeId = this.getNodeParameter('typeId', i) as string;
						endpoint = `/v1/property-types/${typeId}`;
					}
				}

				// ==================== PROPERTY FEATURE ====================
				else if (resource === 'propertyFeature') {
					if (operation === 'getAll') {
						endpoint = '/v1/property-features';
					} else if (operation === 'get') {
						const featureId = this.getNodeParameter('featureId', i) as string;
						endpoint = `/v1/property-feature/${featureId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/property-features';
						body = this.getNodeParameter('featureData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const featureId = this.getNodeParameter('featureId', i) as string;
						endpoint = `/v1/property-feature/${featureId}`;
						body = this.getNodeParameter('featureData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const featureId = this.getNodeParameter('featureId', i) as string;
						endpoint = `/v1/property-feature/${featureId}`;
					}
				}

				// ==================== PROPERTY FIELD ====================
				else if (resource === 'propertyField') {
					if (operation === 'getAll') {
						endpoint = '/v1/property-fields';
					} else if (operation === 'get') {
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/property-field/${fieldId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/property-fields';
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/property-field/${fieldId}`;
						body = this.getNodeParameter('fieldData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						endpoint = `/v1/property-field/${fieldId}`;
					}
				}

				// ==================== PROPERTY PHOTO ====================
				else if (resource === 'propertyPhoto') {
					const propertyId = this.getNodeParameter('propertyId', i) as string;
					if (operation === 'create') {
						method = 'POST';
						endpoint = `/v1/properties/${propertyId}/photos`;
						body = this.getNodeParameter('photoData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'PUT';
						const photoId = this.getNodeParameter('photoId', i) as string;
						endpoint = `/v1/properties/${propertyId}/photos/${photoId}`;
						body = this.getNodeParameter('photoData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const photoId = this.getNodeParameter('photoId', i) as string;
						endpoint = `/v1/properties/${propertyId}/photos/${photoId}`;
					}
				}

				// ==================== PROPERTY ADVERT ====================
				else if (resource === 'propertyAdvert') {
					if (operation === 'getAll') {
						endpoint = '/v1/property-adverts';
					} else if (operation === 'get') {
						const advertKey = this.getNodeParameter('advertKey', i) as string;
						endpoint = `/v1/property-adverts/${advertKey}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/property-adverts';
						body = this.getNodeParameter('advertData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const advertKey = this.getNodeParameter('advertKey', i) as string;
						endpoint = `/v1/property-adverts/${advertKey}`;
						body = this.getNodeParameter('advertData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const advertKey = this.getNodeParameter('advertKey', i) as string;
						endpoint = `/v1/property-adverts/${advertKey}`;
					}
				}

				// ==================== PROPERTY RESERVE ====================
				else if (resource === 'propertyReserve') {
					if (operation === 'getAll') {
						endpoint = '/v1/property-reserves';
					} else if (operation === 'get') {
						const reserveId = this.getNodeParameter('reserveId', i) as string;
						endpoint = `/v1/property-reserve/${reserveId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/property-reserves';
						body = this.getNodeParameter('reserveData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const reserveId = this.getNodeParameter('reserveId', i) as string;
						endpoint = `/v1/property-reserve/${reserveId}`;
						body = this.getNodeParameter('reserveData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const reserveId = this.getNodeParameter('reserveId', i) as string;
						endpoint = `/v1/property-reserve/${reserveId}`;
					}
				}

				// ==================== NEIGHBORHOOD ====================
				else if (resource === 'neighborhood') {
					if (operation === 'getAll') {
						endpoint = '/v1/neighborhoods';
					} else if (operation === 'get') {
						const neighborhoodId = this.getNodeParameter('neighborhoodId', i) as string;
						endpoint = `/v1/neighborhoods/${neighborhoodId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/neighborhoods';
						body = this.getNodeParameter('neighborhoodData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const neighborhoodId = this.getNodeParameter('neighborhoodId', i) as string;
						endpoint = `/v1/neighborhoods/${neighborhoodId}`;
						body = this.getNodeParameter('neighborhoodData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const neighborhoodId = this.getNodeParameter('neighborhoodId', i) as string;
						endpoint = `/v1/neighborhoods/${neighborhoodId}`;
					}
				}

				// ==================== CITY ====================
				else if (resource === 'city') {
					if (operation === 'getAll') {
						endpoint = '/v1/cities';
					}
				}

				// ==================== STATE ====================
				else if (resource === 'state') {
					if (operation === 'getAll') {
						endpoint = '/v1/states';
					}
				}

				// Fazer a requisição
				const requestOptions: IHttpRequestOptions = {
					method,
					url: `https://api.imobzi.app${endpoint}`,
					qs,
					json: true,
				};

				if ((method === 'POST' || method === 'PUT') && Object.keys(body).length > 0) {
					requestOptions.body = body;
				}

				const response = await this.helpers.requestWithAuthentication.call(
					this,
					'imobziApi',
					requestOptions,
				);

				// Processar resposta
				if (resource === 'property' && operation === 'getAll') {
					const properties = response.properties || [];
					if (Array.isArray(properties)) {
						for (const property of properties) {
							returnData.push({ json: property });
						}
					}
					if (response.cursor || response.count) {
						returnData.push({
							json: {
								_pagination: {
									cursor: response.cursor,
									count: response.count,
									count_pending: response.count_pending,
									count_review: response.count_review,
								},
							},
						});
					}
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
