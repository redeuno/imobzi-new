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

export class ImobziFinancial implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Financial',
		name: 'imobziFinancial',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Gerenciar Contas, Transações, Faturas e Notas Fiscais na API Imobzi',
		defaults: {
			name: 'Imobzi Financial',
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
						name: 'Conta',
						value: 'account',
						description: 'Gerenciar contas financeiras',
					},
					{
						name: 'Transação',
						value: 'transaction',
						description: 'Gerenciar transações financeiras',
					},
					{
						name: 'Categoria',
						value: 'category',
						description: 'Gerenciar categorias financeiras',
					},
					{
						name: 'Conta De Proprietário',
						value: 'landlordAccount',
						description: 'Consultar contas de proprietários',
					},
					{
						name: 'Transação De Proprietário',
						value: 'landlordTransaction',
						description: 'Gerenciar transações de proprietários',
					},
					{
						name: 'Fatura (Invoice)',
						value: 'invoice',
						description: 'Gerenciar faturas',
					},
					{
						name: 'Nota Fiscal',
						value: 'notaFiscal',
						description: 'Gerenciar notas fiscais',
					},
					{
						name: 'Banco',
						value: 'bank',
						description: 'Gerenciar bancos',
					},
					{
						name: 'Tag Financeira',
						value: 'financialTag',
						description: 'Consultar tags financeiras',
					},
					{
						name: 'Comissão',
						value: 'commission',
						description: 'Consultar comissões',
					},
				],
				default: 'account',
			},

			// ==================== ACCOUNT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as contas',
						action: 'Listar contas',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter conta por ID',
						action: 'Obter conta',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova conta',
						action: 'Criar conta',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar conta existente',
						action: 'Atualizar conta',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar conta',
						action: 'Deletar conta',
					},
				],
				default: 'getAll',
			},

			// ==================== TRANSACTION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['transaction'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as transações',
						action: 'Listar transa es',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter transação por ID',
						action: 'Obter transa o',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova transação',
						action: 'Criar transa o',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar transação existente',
						action: 'Atualizar transa o',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar transação',
						action: 'Deletar transa o',
					},
					{
						name: 'Adicionar Anexo',
						value: 'addAttachment',
						description: 'Adicionar anexo à transação',
						action: 'Adicionar anexo',
					},
					{
						name: 'Conciliação',
						value: 'match',
						description: 'Conciliar transações',
						action: 'Conciliar transa es',
					},
				],
				default: 'getAll',
			},

			// ==================== CATEGORY ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['category'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as categorias',
						action: 'Listar categorias',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter categoria por ID',
						action: 'Obter categoria',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova categoria',
						action: 'Criar categoria',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar categoria existente',
						action: 'Atualizar categoria',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar categoria',
						action: 'Deletar categoria',
					},
				],
				default: 'getAll',
			},

			// ==================== LANDLORD ACCOUNT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['landlordAccount'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar contas de proprietários',
						action: 'Listar contas de propriet rios',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter conta de proprietário por ID',
						action: 'Obter conta de propriet rio',
					},
				],
				default: 'getAll',
			},

			// ==================== LANDLORD TRANSACTION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['landlordTransaction'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar transações de proprietário',
						action: 'Listar transa es de propriet rio',
					},
					{
						name: 'Obter Repasse',
						value: 'getOnlending',
						description: 'Obter informações de repasse',
						action: 'Obter repasse',
					},
				],
				default: 'getAll',
			},

			// ==================== INVOICE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as faturas',
						action: 'Listar faturas',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter fatura por ID',
						action: 'Obter fatura',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova fatura',
						action: 'Criar fatura',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar fatura existente',
						action: 'Atualizar fatura',
					},
					{
						name: 'Enviar Notificação',
						value: 'sendNotification',
						description: 'Enviar notificação da fatura',
						action: 'Enviar notifica o',
					},
				],
				default: 'getAll',
			},

			// ==================== NOTA FISCAL ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['notaFiscal'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as notas fiscais',
						action: 'Listar notas fiscais',
					},
					{
						name: 'Obter Por Chave',
						value: 'get',
						description: 'Obter nota fiscal por chave',
						action: 'Obter nota fiscal',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova nota fiscal',
						action: 'Criar nota fiscal',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar nota fiscal',
						action: 'Atualizar nota fiscal',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar nota fiscal',
						action: 'Deletar nota fiscal',
					},
					{
						name: 'Enviar Por Email',
						value: 'sendEmail',
						description: 'Enviar nota fiscal por email',
						action: 'Enviar por email',
					},
					{
						name: 'Transações Do Proprietário',
						value: 'getLandlordTransactions',
						description: 'Listar transações do proprietário para NF',
						action: 'Transa es do propriet rio',
					},
				],
				default: 'getAll',
			},

			// ==================== BANK ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['bank'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todos os bancos',
						action: 'Listar bancos',
					},
					{
						name: 'Obter Por ID',
						value: 'get',
						description: 'Obter banco por ID',
						action: 'Obter banco',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo banco',
						action: 'Criar banco',
					},
				],
				default: 'getAll',
			},

			// ==================== FINANCIAL TAG ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['financialTag'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar todas as tags',
						action: 'Listar tags financeiras',
					},
				],
				default: 'getAll',
			},

			// ==================== COMMISSION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['commission'],
					},
				},
				options: [
					{
						name: 'Obter Repasse De Comissão',
						value: 'getOnlending',
						description: 'Obter recibo de repasse de comissão',
						action: 'Obter repasse de comiss o',
					},
				],
				default: 'getOnlending',
			},

			// ==================== CAMPOS DE ID ====================
			{
				displayName: 'ID Da Conta',
				name: 'accountId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID da conta financeira',
			},
			{
				displayName: 'ID Da Transação',
				name: 'transactionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['transaction'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Categoria',
				name: 'categoryId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['category'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Conta De Proprietário',
				name: 'landlordAccountId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['landlordAccount'],
						operation: ['get'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Conta De Proprietário',
				name: 'landlordAccountId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['landlordTransaction'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Transação Do Proprietário',
				name: 'landlordTransactionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['landlordTransaction'],
						operation: ['getOnlending'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Fatura',
				name: 'invoiceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['get', 'update', 'sendNotification'],
					},
				},
				default: '',
			},
			{
				displayName: 'Chave Da Nota Fiscal',
				name: 'notaFiscalKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['notaFiscal'],
						operation: ['get', 'update', 'delete', 'sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Da Conta De Proprietário',
				name: 'landlordAccountId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['notaFiscal'],
						operation: ['getLandlordTransactions'],
					},
				},
				default: '',
			},
			{
				displayName: 'ID Do Banco',
				name: 'bankId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['bank'],
						operation: ['get'],
					},
				},
				default: '',
			},

			// ==================== FILTROS ====================
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['transaction'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Da Conta',
						name: 'account_id',
						type: 'string',
						default: '',
						description: 'Filtrar por conta',
					},
					{
						displayName: 'Tipo',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Receita', value: 'income' },
							{ name: 'Despesa', value: 'expense' },
						],
						default: '',
						description: 'Tipo de transação',
					},
					{
						displayName: 'Status De Pagamento',
						name: 'paid',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pago', value: 'true' },
							{ name: 'Pendente', value: 'false' },
						],
						default: '',
					},
					{
						displayName: 'Categoria',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Filtrar por categoria',
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
						displayName: 'Texto De Busca',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Texto para buscar',
					},
				],
			},
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pendente', value: 'pending' },
							{ name: 'Pago', value: 'paid' },
							{ name: 'Atrasado', value: 'overdue' },
							{ name: 'Cancelado', value: 'cancelled' },
						],
						default: '',
						description: 'Status da fatura',
					},
					{
						displayName: 'ID Do Contrato',
						name: 'contract_id',
						type: 'string',
						default: '',
						description: 'Filtrar por contrato',
					},
					{
						displayName: 'ID Da Locação',
						name: 'lease_id',
						type: 'string',
						default: '',
						description: 'Filtrar por locação',
					},
					{
						displayName: 'Data De Vencimento (Início)',
						name: 'due_date_start',
						type: 'dateTime',
						default: '',
						description: 'Vencimento a partir de',
					},
					{
						displayName: 'Data De Vencimento (Fim)',
						name: 'due_date_end',
						type: 'dateTime',
						default: '',
						description: 'Vencimento até',
					},
				],
			},
			{
				displayName: 'Filtros',
				name: 'filters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['notaFiscal'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pendente', value: 'pending' },
							{ name: 'Emitida', value: 'issued' },
							{ name: 'Cancelada', value: 'cancelled' },
						],
						default: '',
						description: 'Status da nota fiscal',
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
				],
			},

			// ==================== DADOS PARA CRIAR/ATUALIZAR ====================

			// Account Data
			{
				displayName: 'Dados Da Conta',
				name: 'accountData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome da conta',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição da conta',
					},
					{
						displayName: 'Tipo De Conta',
						name: 'account_type',
						type: 'options',
						options: [
							{ name: 'Conta Corrente', value: 'checking' },
							{ name: 'Conta Poupança', value: 'savings' },
							{ name: 'Conta Digital', value: 'digital_account' },
							{ name: 'Caixa', value: 'cash' },
						],
						default: 'checking',
						description: 'Tipo da conta',
					},
					{
						displayName: 'Banco',
						name: 'bank_name',
						type: 'string',
						default: '',
						description: 'Nome do banco',
					},
					{
						displayName: 'Agência',
						name: 'agency',
						type: 'string',
						default: '',
						description: 'Número da agência',
					},
					{
						displayName: 'Número Da Conta',
						name: 'account_number',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Saldo Inicial',
						name: 'initial_value',
						type: 'number',
						default: 0,
						description: 'Saldo inicial da conta',
					},
					{
						displayName: 'Favorita',
						name: 'favorite',
						type: 'boolean',
						default: false,
						description: 'Whether this is a favorite account',
					},
					{
						displayName: 'Ativa',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Whether the account is active',
					},
				],
			},

			// Transaction Data
			{
				displayName: 'Dados Da Transação',
				name: 'transactionData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['transaction'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição da transação',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Valor da transação (negativo para despesa)',
					},
					{
						displayName: 'ID Da Conta',
						name: 'account_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Categoria',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Categoria da transação',
					},
					{
						displayName: 'Subcategoria',
						name: 'subcategory',
						type: 'string',
						default: '',
						description: 'Subcategoria da transação',
					},
					{
						displayName: 'Data De Vencimento',
						name: 'due_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Pago',
						name: 'paid',
						type: 'boolean',
						default: false,
						description: 'Whether the transaction is paid',
					},
					{
						displayName: 'Data Do Pagamento',
						name: 'paid_at',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Tipo De Repetição',
						name: 'repeat_type',
						type: 'options',
						options: [
							{ name: 'Única', value: 'single' },
							{ name: 'Recorrente', value: 'recurrent' },
							{ name: 'Parcelada', value: 'installment' },
						],
						default: 'single',
					},
					{
						displayName: 'Observações',
						name: 'notes',
						type: 'string',
						default: '',
						description: 'Observações adicionais',
					},
				],
			},

			// Category Data
			{
				displayName: 'Dados Da Categoria',
				name: 'categoryData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['category'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome da categoria',
					},
					{
						displayName: 'Tipo',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'Receita', value: 'income' },
							{ name: 'Despesa', value: 'expense' },
						],
						default: 'expense',
						description: 'Tipo da categoria',
					},
					{
						displayName: 'Cor',
						name: 'color',
						type: 'color',
						default: '#3498db',
						description: 'Cor da categoria',
					},
				],
			},

			// Invoice Data
			{
				displayName: 'Dados Da Fatura',
				name: 'invoiceData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'ID Da Locação',
						name: 'lease_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Valor da fatura',
					},
					{
						displayName: 'Data De Vencimento',
						name: 'due_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição da fatura',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Pendente', value: 'pending' },
							{ name: 'Pago', value: 'paid' },
							{ name: 'Cancelado', value: 'cancelled' },
						],
						default: 'pending',
						description: 'Status da fatura',
					},
				],
			},

			// Nota Fiscal Data
			{
				displayName: 'Dados Da Nota Fiscal',
				name: 'notaFiscalData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['notaFiscal'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'ID Do Proprietário',
						name: 'landlord_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Valor da nota fiscal',
					},
					{
						displayName: 'Descrição Do Serviço',
						name: 'service_description',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Data De Emissão',
						name: 'issue_date',
						type: 'dateTime',
						default: '',
					},
				],
			},

			// Bank Data
			{
				displayName: 'Dados Do Banco',
				name: 'bankData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['bank'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do banco',
					},
					{
						displayName: 'Código',
						name: 'code',
						type: 'string',
						default: '',
						description: 'Código do banco',
					},
				],
			},

			// Attachment Data
			{
				displayName: 'Dados Do Anexo',
				name: 'attachmentData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: ['transaction'],
						operation: ['addAttachment'],
					},
				},
				options: [
					{
						displayName: 'ID Da Transação',
						name: 'transaction_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'URL Do Arquivo',
						name: 'file_url',
						type: 'string',
						default: '',
						description: 'URL do arquivo anexo',
					},
					{
						displayName: 'Nome Do Arquivo',
						name: 'file_name',
						type: 'string',
						default: '',
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
						resource: ['account', 'transaction', 'category', 'landlordAccount', 'invoice', 'notaFiscal', 'bank', 'financialTag'],
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
						resource: ['account', 'transaction', 'category', 'landlordAccount', 'invoice', 'notaFiscal', 'bank', 'financialTag'],
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
			async getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: 'https://api.imobzi.app/v1/financial/accounts',
							json: true,
						},
					);
					const accounts = response.accounts || [];
					for (const account of accounts) {
						returnData.push({
							name: account.name,
							value: account.db_id,
						});
					}
				} catch (error) {
					// Return empty if error
				}
				return returnData;
			},
			async getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: 'https://api.imobzi.app/v1/financial/categories',
							json: true,
						},
					);
					const categories = Array.isArray(response) ? response : response.categories || [];
					for (const category of categories) {
						returnData.push({
							name: category.name,
							value: category.db_id || category.id,
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

				// ==================== ACCOUNT ====================
				if (resource === 'account') {
					if (operation === 'getAll') {
						endpoint = '/v1/financial/accounts';
					} else if (operation === 'get') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						endpoint = `/v1/financial/account/${accountId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/financial/accounts';
						body = this.getNodeParameter('accountData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const accountId = this.getNodeParameter('accountId', i) as string;
						endpoint = `/v1/financial/account/${accountId}`;
						body = this.getNodeParameter('accountData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const accountId = this.getNodeParameter('accountId', i) as string;
						endpoint = `/v1/financial/account/${accountId}`;
					}
				}

				// ==================== TRANSACTION ====================
				else if (resource === 'transaction') {
					if (operation === 'getAll') {
						endpoint = '/v1/financial/transactions';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'get') {
						const transactionId = this.getNodeParameter('transactionId', i) as string;
						endpoint = `/v1/financial/transaction/${transactionId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/financial/transactions';
						body = this.getNodeParameter('transactionData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const transactionId = this.getNodeParameter('transactionId', i) as string;
						endpoint = `/v1/financial/transaction/${transactionId}`;
						body = this.getNodeParameter('transactionData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const transactionId = this.getNodeParameter('transactionId', i) as string;
						endpoint = `/v1/financial/transaction/${transactionId}`;
					} else if (operation === 'addAttachment') {
						method = 'POST';
						endpoint = '/v1/financial/transaction/attachments';
						body = this.getNodeParameter('attachmentData', i, {}) as IDataObject;
					} else if (operation === 'match') {
						endpoint = '/v1/financial/transaction-match';
					}
				}

				// ==================== CATEGORY ====================
				else if (resource === 'category') {
					if (operation === 'getAll') {
						endpoint = '/v1/financial/categories';
					} else if (operation === 'get') {
						const categoryId = this.getNodeParameter('categoryId', i) as string;
						endpoint = `/v1/financial/category/${categoryId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/financial/categories';
						body = this.getNodeParameter('categoryData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const categoryId = this.getNodeParameter('categoryId', i) as string;
						endpoint = `/v1/financial/category/${categoryId}`;
						body = this.getNodeParameter('categoryData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const categoryId = this.getNodeParameter('categoryId', i) as string;
						endpoint = `/v1/financial/category/${categoryId}`;
					}
				}

				// ==================== LANDLORD ACCOUNT ====================
				else if (resource === 'landlordAccount') {
					if (operation === 'getAll') {
						endpoint = '/v1/financial/landlord/accounts';
					} else if (operation === 'get') {
						const landlordAccountId = this.getNodeParameter('landlordAccountId', i) as string;
						endpoint = `/v1/financial/landlord/account/${landlordAccountId}`;
					}
				}

				// ==================== LANDLORD TRANSACTION ====================
				else if (resource === 'landlordTransaction') {
					if (operation === 'getAll') {
						const landlordAccountId = this.getNodeParameter('landlordAccountId', i) as string;
						endpoint = `/v1/financial/landlord/account/${landlordAccountId}/transactions`;
					} else if (operation === 'getOnlending') {
						const landlordTransactionId = this.getNodeParameter('landlordTransactionId', i) as string;
						endpoint = `/v1/financial/landlord/account/individual-onlending/${landlordTransactionId}`;
					}
				}

				// ==================== INVOICE ====================
				else if (resource === 'invoice') {
					if (operation === 'getAll') {
						endpoint = '/v1/invoices';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'get') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						endpoint = `/v1/invoice/${invoiceId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/invoices';
						body = this.getNodeParameter('invoiceData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						endpoint = `/v1/invoice/${invoiceId}`;
						body = this.getNodeParameter('invoiceData', i, {}) as IDataObject;
					} else if (operation === 'sendNotification') {
						method = 'POST';
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						endpoint = `/v1/invoice/${invoiceId}/send-notification`;
					}
				}

				// ==================== NOTA FISCAL ====================
				else if (resource === 'notaFiscal') {
					if (operation === 'getAll') {
						endpoint = '/v1/notas-fiscais';
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						qs = { ...filters };
					} else if (operation === 'get') {
						const notaFiscalKey = this.getNodeParameter('notaFiscalKey', i) as string;
						endpoint = `/v1/nota-fiscal/${notaFiscalKey}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/notas-fiscais';
						body = this.getNodeParameter('notaFiscalData', i, {}) as IDataObject;
					} else if (operation === 'update') {
						method = 'POST';
						const notaFiscalKey = this.getNodeParameter('notaFiscalKey', i) as string;
						endpoint = `/v1/nota-fiscal/${notaFiscalKey}`;
						body = this.getNodeParameter('notaFiscalData', i, {}) as IDataObject;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const notaFiscalKey = this.getNodeParameter('notaFiscalKey', i) as string;
						endpoint = `/v1/nota-fiscal/${notaFiscalKey}`;
					} else if (operation === 'sendEmail') {
						method = 'POST';
						const notaFiscalKey = this.getNodeParameter('notaFiscalKey', i) as string;
						endpoint = `/v1/nota-fiscal/${notaFiscalKey}/send-email`;
					} else if (operation === 'getLandlordTransactions') {
						const landlordAccountId = this.getNodeParameter('landlordAccountId', i) as string;
						endpoint = `/v1/nota-fiscal/landlord/${landlordAccountId}/transactions`;
					}
				}

				// ==================== BANK ====================
				else if (resource === 'bank') {
					if (operation === 'getAll') {
						endpoint = '/v1/banks';
					} else if (operation === 'get') {
						const bankId = this.getNodeParameter('bankId', i) as string;
						endpoint = `/v1/bank/${bankId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/v1/banks';
						body = this.getNodeParameter('bankData', i, {}) as IDataObject;
					}
				}

				// ==================== FINANCIAL TAG ====================
				else if (resource === 'financialTag') {
					if (operation === 'getAll') {
						endpoint = '/v1/financial/tags';
					}
				}

				// ==================== COMMISSION ====================
				else if (resource === 'commission') {
					if (operation === 'getOnlending') {
						endpoint = '/v1/commission/onlending';
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
				if (resource === 'account' && operation === 'getAll') {
					const accounts = response.accounts || [];
					for (const account of accounts) {
						returnData.push({ json: account });
					}
					if (response.total_balance !== undefined) {
						returnData.push({
							json: {
								_summary: {
									total_balance: response.total_balance,
								},
							},
						});
					}
				} else if (resource === 'transaction' && operation === 'getAll') {
					const transactions = response.transactions || [];
					for (const transaction of transactions) {
						returnData.push({ json: transaction });
					}
					if (response.total !== undefined) {
						returnData.push({
							json: {
								_summary: {
									total: response.total,
									incomes: response.incomes,
									expenses: response.expenses,
									coming_incomes: response.coming_incomes,
									coming_expenses: response.coming_expenses,
									previous_balance: response.previous_balance,
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
