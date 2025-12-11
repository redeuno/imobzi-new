import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	NodeConnectionType,
	IDataObject,
} from 'n8n-workflow';

export class ImobziCore implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Core',
		name: 'imobziCore',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Imobzi Core API - Users, Documents, Calendar, Teams, Webhooks, Notifications, Timelines',
		defaults: {
			name: 'Imobzi Core',
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
			// Resource selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Calendar', value: 'calendar' },
					{ name: 'Calendar Type', value: 'calendarType' },
					{ name: 'Chat', value: 'chat' },
					{ name: 'Credit Analysis', value: 'creditAnalysis' },
					{ name: 'Document', value: 'document' },
					{ name: 'Integration', value: 'integration' },
					{ name: 'Media Source', value: 'mediaSource' },
					{ name: 'Measure', value: 'measure' },
					{ name: 'Notification', value: 'notification' },
					{ name: 'Parameter', value: 'parameter' },
					{ name: 'Real Estate Post', value: 'realEstatePost' },
					{ name: 'Realtor', value: 'realtor' },
					{ name: 'Report', value: 'report' },
					{ name: 'Revision', value: 'revision' },
					{ name: 'Send Message', value: 'sendMessage' },
					{ name: 'Team', value: 'team' },
					{ name: 'Timeline', value: 'timeline' },
					{ name: 'User', value: 'user' },
					{ name: 'User Billing', value: 'userBilling' },
					{ name: 'Util', value: 'utils' },
					{ name: 'Vacation Calendar', value: 'vacationCalendar' },
					{ name: 'Webhook', value: 'webhook' },
				],
				default: 'user',
			},

			// ==================== USER OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['user'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a user' },
					{ name: 'Get', value: 'get', action: 'Get a user' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many users' },
					{ name: 'Get Profile', value: 'getProfile', action: 'Get user profile' },
					{ name: 'Get Properties', value: 'getProperties', action: 'Get user properties' },
					{ name: 'Get Ranking', value: 'getRanking', action: 'Get users ranking' },
					{ name: 'Get Rules', value: 'getRules', action: 'Get user rules' },
					{ name: 'Get All Rules', value: 'getAllRules', action: 'Get all rules' },
					{ name: 'Validate Email', value: 'validateEmail', action: 'Validate email' },
				],
				default: 'getAll',
			},

			// ==================== TEAM OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['team'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a team' },
					{ name: 'Delete', value: 'delete', action: 'Delete a team' },
					{ name: 'Get', value: 'get', action: 'Get a team' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many teams' },
					{ name: 'Update', value: 'update', action: 'Update a team' },
				],
				default: 'getAll',
			},

			// ==================== DOCUMENT OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['document'] } },
				options: [
					{ name: 'Add File', value: 'addFile', action: 'Add file to document' },
					{ name: 'Create', value: 'create', action: 'Create a document' },
					{ name: 'Delete', value: 'delete', action: 'Delete a document' },
					{ name: 'Delete File', value: 'deleteFile', action: 'Delete file from document' },
					{ name: 'Duplicate', value: 'duplicate', action: 'Duplicate a document' },
					{ name: 'Get', value: 'get', action: 'Get a document' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many documents' },
					{ name: 'Get Fee', value: 'getFee', action: 'Get document fee' },
					{ name: 'Update', value: 'update', action: 'Update a document' },
				],
				default: 'getAll',
			},

			// ==================== CALENDAR OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['calendar'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create calendar item' },
					{ name: 'Delete', value: 'delete', action: 'Delete calendar item' },
					{ name: 'Get', value: 'get', action: 'Get calendar item' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many calendar items' },
					{ name: 'Update', value: 'update', action: 'Update calendar item' },
				],
				default: 'getAll',
			},

			// ==================== CALENDAR TYPE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['calendarType'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create calendar type' },
					{ name: 'Delete', value: 'delete', action: 'Delete calendar type' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many calendar types' },
					{ name: 'Update', value: 'update', action: 'Update calendar type' },
				],
				default: 'getAll',
			},

			// ==================== TIMELINE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['timeline'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create timeline item' },
					{ name: 'Delete', value: 'delete', action: 'Delete timeline item' },
					{ name: 'Get', value: 'get', action: 'Get timeline item' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many timeline items' },
					{ name: 'Update', value: 'update', action: 'Update timeline item' },
				],
				default: 'getAll',
			},

			// ==================== NOTIFICATION OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['notification'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create notification' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many notifications' },
					{ name: 'Update', value: 'update', action: 'Update notification' },
				],
				default: 'getAll',
			},

			// ==================== WEBHOOK OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['webhook'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a webhook' },
					{ name: 'Delete', value: 'delete', action: 'Delete a webhook' },
					{ name: 'Get', value: 'get', action: 'Get a webhook' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many webhooks' },
					{ name: 'Update', value: 'update', action: 'Update a webhook' },
				],
				default: 'getAll',
			},

			// ==================== MEDIA SOURCE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['mediaSource'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create media source' },
					{ name: 'Delete', value: 'delete', action: 'Delete media source' },
					{ name: 'Get', value: 'get', action: 'Get media source' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many media sources' },
					{ name: 'Get Report', value: 'getReport', action: 'Get media sources report' },
					{ name: 'Update', value: 'update', action: 'Update media source' },
				],
				default: 'getAll',
			},

			// ==================== INTEGRATION OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['integration'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Get many integrations' },
				],
				default: 'getAll',
			},

			// ==================== REVISION OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['revision'] } },
				options: [
					{ name: 'Get', value: 'get', action: 'Get revision' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many revisions' },
					{ name: 'Restore', value: 'restore', action: 'Restore revision' },
				],
				default: 'getAll',
			},

			// ==================== PARAMETER OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['parameter'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Get parameters' },
				],
				default: 'getAll',
			},

			// ==================== CHAT OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['chat'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create chat conversation' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many chat conversations' },
				],
				default: 'getAll',
			},

			// ==================== SEND MESSAGE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['sendMessage'] } },
				options: [
					{ name: 'Send', value: 'send', action: 'Send message' },
				],
				default: 'send',
			},

			// ==================== MEASURE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['measure'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create measure' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many measures' },
				],
				default: 'getAll',
			},

			// ==================== USER BILLING OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['userBilling'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Get user billing' },
				],
				default: 'getAll',
			},

			// ==================== UTILS OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['utils'] } },
				options: [
					{ name: 'Get', value: 'get', action: 'Get utils by type' },
				],
				default: 'get',
			},

			// ==================== VACATION CALENDAR OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['vacationCalendar'] } },
				options: [
					{ name: 'Get', value: 'get', action: 'Get vacation calendar' },
					{ name: 'Update', value: 'update', action: 'Update vacation calendar' },
				],
				default: 'get',
			},

			// ==================== REALTOR OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['realtor'] } },
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Get many realtors' },
				],
				default: 'getAll',
			},

			// ==================== REPORT OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['report'] } },
				options: [
					{ name: 'Site Analytics', value: 'siteAnalytics', action: 'Get site analytics' },
					{ name: 'User Performance', value: 'userPerformance', action: 'Get user performance' },
				],
				default: 'siteAnalytics',
			},

			// ==================== CREDIT ANALYSIS OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['creditAnalysis'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create credit analysis' },
					{ name: 'Delete', value: 'delete', action: 'Delete credit analysis' },
					{ name: 'Get', value: 'get', action: 'Get credit analysis' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many credit analyses' },
					{ name: 'Get Fee', value: 'getFee', action: 'Get analysis fee' },
					{ name: 'Update', value: 'update', action: 'Update credit analysis' },
				],
				default: 'getAll',
			},

			// ==================== REAL ESTATE POST OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['realEstatePost'] } },
				options: [
					{ name: 'Create Comment', value: 'createComment', action: 'Create comment' },
					{ name: 'Create Reply', value: 'createReply', action: 'Create reply' },
					{ name: 'Delete Comment', value: 'deleteComment', action: 'Delete comment' },
					{ name: 'Delete Reply', value: 'deleteReply', action: 'Delete reply' },
					{ name: 'Get Comments', value: 'getComments', action: 'Get comments' },
					{ name: 'Get Replies', value: 'getReplies', action: 'Get replies' },
					{ name: 'Update Comment', value: 'updateComment', action: 'Update comment' },
					{ name: 'Update Reply', value: 'updateReply', action: 'Update reply' },
				],
				default: 'getComments',
			},

			// ==================== ID FIELDS ====================
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get', 'getProperties', 'getRules'],
					},
				},
				default: '',
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get', 'update', 'delete', 'duplicate'],
					},
				},
				default: '',
			},
			{
				displayName: 'Calendar ID',
				name: 'calendarId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['calendar'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Calendar Type ID',
				name: 'calendarTypeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['calendarType'],
						operation: ['update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Timeline Key',
				name: 'timelineKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['timeline'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Notification ID',
				name: 'notificationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['notification'],
						operation: ['update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Media Source ID',
				name: 'mediaSourceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['mediaSource'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Register Type',
				name: 'registerType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['revision'],
						operation: ['getAll', 'get', 'restore'],
					},
				},
				options: [
					{ name: 'Contact', value: 'contact' },
					{ name: 'Deal', value: 'deal' },
					{ name: 'Lease', value: 'lease' },
					{ name: 'Property', value: 'property' },
				],
				default: 'property',
			},
			{
				displayName: 'Revision Key',
				name: 'revisionKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['revision'],
						operation: ['get', 'restore'],
					},
				},
				default: '',
			},
			{
				displayName: 'Analysis ID',
				name: 'analysisId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['creditAnalysis'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Post ID',
				name: 'postId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['realEstatePost'],
					},
				},
				default: '',
			},
			{
				displayName: 'Comment ID',
				name: 'commentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['realEstatePost'],
						operation: ['updateComment', 'deleteComment', 'getReplies', 'createReply', 'updateReply', 'deleteReply'],
					},
				},
				default: '',
			},
			{
				displayName: 'Reply ID',
				name: 'replyId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['realEstatePost'],
						operation: ['updateReply', 'deleteReply'],
					},
				},
				default: '',
			},
			{
				displayName: 'Send Type',
				name: 'sendType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['sendMessage'],
						operation: ['send'],
					},
				},
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'SMS', value: 'sms' },
					{ name: 'WhatsApp', value: 'whatsapp' },
				],
				default: 'email',
			},
			{
				displayName: 'Utils Type',
				name: 'utilsType',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['utils'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'Type of utility to retrieve',
			},
			{
				displayName: 'Property Code',
				name: 'propertyCode',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['vacationCalendar'],
						operation: ['get'],
					},
				},
				default: '',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['measure'],
						operation: ['getAll'],
					},
				},
				default: 'pt-BR',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['validateEmail'],
					},
				},
				default: '',
			},

			// ==================== BODY DATA ====================
			{
				displayName: 'Body Data',
				name: 'bodyData',
				type: 'json',
				displayOptions: {
					show: {
						operation: ['create', 'update', 'send', 'addFile', 'createComment', 'createReply', 'updateComment', 'updateReply'],
					},
				},
				default: '{}',
				description: 'JSON body for the request',
			},

			// ==================== ADDITIONAL OPTIONS ====================
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Cursor',
						name: 'cursor',
						type: 'string',
						default: '',
						description: 'Cursor for pagination',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
					},
					{
						displayName: 'Active',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Whether to filter by active status',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'string',
						default: '',
						description: 'Filter by status',
					},
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Search term',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'dateTime',
						default: '',
						description: 'Start date filter',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'dateTime',
						default: '',
						description: 'End date filter',
					},
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'string',
						default: '',
						description: 'Filter by user ID',
					},
					{
						displayName: 'Contact ID',
						name: 'contact_id',
						type: 'string',
						default: '',
						description: 'Filter by contact ID',
					},
					{
						displayName: 'Property ID',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filter by property ID',
					},
					{
						displayName: 'Deal ID',
						name: 'deal_id',
						type: 'string',
						default: '',
						description: 'Filter by deal ID',
					},
					{
						displayName: 'Lease ID',
						name: 'lease_id',
						type: 'string',
						default: '',
						description: 'Filter by lease ID',
					},
					{
						displayName: 'Pipeline ID',
						name: 'pipeline_id',
						type: 'string',
						default: '',
						description: 'Filter by pipeline ID',
					},
					{
						displayName: 'Team ID',
						name: 'team_id',
						type: 'string',
						default: '',
						description: 'Filter by team ID',
					},
					{
						displayName: 'Include Inactive',
						name: 'include_inactive',
						type: 'boolean',
						default: false,
						description: 'Whether to include inactive items',
					},
					{
						displayName: 'Order By',
						name: 'order_by',
						type: 'string',
						default: '',
						description: 'Order by field',
					},
					{
						displayName: 'Order',
						name: 'order',
						type: 'options',
						options: [
							{ name: 'Ascending', value: 'asc' },
							{ name: 'Descending', value: 'desc' },
						],
						default: 'desc',
						description: 'Order direction',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getTeams(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('imobziApi');
				const response = await this.helpers.request({
					method: 'GET',
					url: `${credentials.baseUrl || 'https://api.imobzi.app'}/v1/user-teams`,
					headers: { 'X-Imobzi-Secret': credentials.apiKey },
					json: true,
				});
				return (Array.isArray(response) ? response : []).map((team: { db_id: string; name: string }) => ({
					name: team.name,
					value: team.db_id,
				}));
			},
			async getUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('imobziApi');
				const response = await this.helpers.request({
					method: 'GET',
					url: `${credentials.baseUrl || 'https://api.imobzi.app'}/v1/users`,
					headers: { 'X-Imobzi-Secret': credentials.apiKey },
					json: true,
				});
				return (Array.isArray(response) ? response : []).map((user: { db_id: string; name: string; email: string }) => ({
					name: `${user.name} (${user.email})`,
					value: user.db_id,
				}));
			},
			async getCalendarTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('imobziApi');
				const response = await this.helpers.request({
					method: 'GET',
					url: `${credentials.baseUrl || 'https://api.imobzi.app'}/v1/calendar-types`,
					headers: { 'X-Imobzi-Secret': credentials.apiKey },
					json: true,
				});
				return (Array.isArray(response) ? response : []).map((type: { db_id: string; name: string }) => ({
					name: type.name,
					value: type.db_id,
				}));
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('imobziApi');
		const baseUrl = (credentials.baseUrl as string) || 'https://api.imobzi.app';

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as Record<string, unknown>;

				let endpoint = '';
				let method: IHttpRequestMethods = 'GET';
				let body: IDataObject | undefined;
				const qs: IDataObject = {};

				// Build query string from additional options
				Object.entries(additionalOptions).forEach(([key, value]) => {
					if (value !== '' && value !== undefined && value !== null) {
						qs[key] = value;
					}
				});

				// ==================== USER ====================
				if (resource === 'user') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/users';
							break;
						case 'get':
							const userId = this.getNodeParameter('userId', i) as string;
							endpoint = `/v1/user/${userId}`;
							break;
						case 'getProfile':
							endpoint = '/v1/user/profile';
							break;
						case 'getProperties':
							const userIdProps = this.getNodeParameter('userId', i) as string;
							endpoint = `/v1/user/${userIdProps}/properties`;
							break;
						case 'getRanking':
							endpoint = '/v1/users/ranking';
							break;
						case 'getRules':
							const userIdRules = this.getNodeParameter('userId', i) as string;
							endpoint = `/v1/user/${userIdRules}/rules`;
							break;
						case 'getAllRules':
							endpoint = '/v1/user-rules';
							break;
						case 'validateEmail':
							const email = this.getNodeParameter('email', i) as string;
							endpoint = '/v1/user/emailvalid';
							qs.email = email;
							break;
						case 'create':
							endpoint = '/v1/users';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
					}
				}

				// ==================== TEAM ====================
				else if (resource === 'team') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/user-teams';
							break;
						case 'get':
							const teamId = this.getNodeParameter('teamId', i) as string;
							endpoint = `/v1/user-team/${teamId}`;
							break;
						case 'create':
							endpoint = '/v1/user-teams';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const teamIdUpdate = this.getNodeParameter('teamId', i) as string;
							endpoint = `/v1/user-team/${teamIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const teamIdDelete = this.getNodeParameter('teamId', i) as string;
							endpoint = `/v1/user-team/${teamIdDelete}`;
							method = 'DELETE';
							break;
					}
				}

				// ==================== DOCUMENT ====================
				else if (resource === 'document') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/documents';
							break;
						case 'get':
							const documentId = this.getNodeParameter('documentId', i) as string;
							endpoint = `/v1/document/${documentId}`;
							break;
						case 'create':
							endpoint = '/v1/documents';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const documentIdUpdate = this.getNodeParameter('documentId', i) as string;
							endpoint = `/v1/document/${documentIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const documentIdDelete = this.getNodeParameter('documentId', i) as string;
							endpoint = `/v1/document/${documentIdDelete}`;
							method = 'DELETE';
							break;
						case 'duplicate':
							const documentIdDup = this.getNodeParameter('documentId', i) as string;
							endpoint = `/v1/document/${documentIdDup}/duplicate`;
							method = 'POST';
							break;
						case 'addFile':
							endpoint = '/v1/documents/files';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'deleteFile':
							endpoint = '/v1/documents/files';
							method = 'DELETE';
							break;
						case 'getFee':
							endpoint = '/v1/document-fee';
							break;
					}
				}

				// ==================== CALENDAR ====================
				else if (resource === 'calendar') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/calendar';
							break;
						case 'get':
							const calendarId = this.getNodeParameter('calendarId', i) as string;
							endpoint = `/v1/calendar-item/${calendarId}`;
							break;
						case 'create':
							endpoint = '/v1/calendar';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const calendarIdUpdate = this.getNodeParameter('calendarId', i) as string;
							endpoint = `/v1/calendar-item/${calendarIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const calendarIdDelete = this.getNodeParameter('calendarId', i) as string;
							endpoint = `/v1/calendar-item/${calendarIdDelete}`;
							method = 'DELETE';
							break;
					}
				}

				// ==================== CALENDAR TYPE ====================
				else if (resource === 'calendarType') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/calendar-types';
							break;
						case 'create':
							endpoint = '/v1/calendar-types';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const calendarTypeId = this.getNodeParameter('calendarTypeId', i) as string;
							endpoint = `/v1/calendar-types/${calendarTypeId}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const calendarTypeIdDelete = this.getNodeParameter('calendarTypeId', i) as string;
							endpoint = `/v1/calendar-types/${calendarTypeIdDelete}`;
							method = 'DELETE';
							break;
					}
				}

				// ==================== TIMELINE ====================
				else if (resource === 'timeline') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/timeline';
							break;
						case 'get':
							const timelineKey = this.getNodeParameter('timelineKey', i) as string;
							endpoint = `/v1/timeline-item/${timelineKey}`;
							break;
						case 'create':
							endpoint = '/v1/timeline';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const timelineKeyUpdate = this.getNodeParameter('timelineKey', i) as string;
							endpoint = `/v1/timeline-item/${timelineKeyUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const timelineKeyDelete = this.getNodeParameter('timelineKey', i) as string;
							endpoint = `/v1/timeline-item/${timelineKeyDelete}`;
							method = 'DELETE';
							break;
					}
				}

				// ==================== NOTIFICATION ====================
				else if (resource === 'notification') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/notifications';
							break;
						case 'create':
							endpoint = '/v1/notifications';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const notificationId = this.getNodeParameter('notificationId', i) as string;
							endpoint = `/v1/notification/${notificationId}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
					}
				}

				// ==================== WEBHOOK ====================
				else if (resource === 'webhook') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/webhooks';
							break;
						case 'get':
							const webhookId = this.getNodeParameter('webhookId', i) as string;
							endpoint = `/v1/webhook/${webhookId}`;
							break;
						case 'create':
							endpoint = '/v1/webhooks';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const webhookIdUpdate = this.getNodeParameter('webhookId', i) as string;
							endpoint = `/v1/webhook/${webhookIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const webhookIdDelete = this.getNodeParameter('webhookId', i) as string;
							endpoint = `/v1/webhook/${webhookIdDelete}`;
							method = 'DELETE';
							break;
					}
				}

				// ==================== MEDIA SOURCE ====================
				else if (resource === 'mediaSource') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/media-sources';
							break;
						case 'get':
							const mediaSourceId = this.getNodeParameter('mediaSourceId', i) as string;
							endpoint = `/v1/media-source/${mediaSourceId}`;
							break;
						case 'create':
							endpoint = '/v1/media-sources';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const mediaSourceIdUpdate = this.getNodeParameter('mediaSourceId', i) as string;
							endpoint = `/v1/media-source/${mediaSourceIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const mediaSourceIdDelete = this.getNodeParameter('mediaSourceId', i) as string;
							endpoint = `/v1/media-source/${mediaSourceIdDelete}`;
							method = 'DELETE';
							break;
						case 'getReport':
							endpoint = '/v1/media-sources-report';
							break;
					}
				}

				// ==================== INTEGRATION ====================
				else if (resource === 'integration') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/integrations';
							break;
					}
				}

				// ==================== REVISION ====================
				else if (resource === 'revision') {
					const registerType = this.getNodeParameter('registerType', i) as string;
					switch (operation) {
						case 'getAll':
							endpoint = `/v1/revision/${registerType}`;
							break;
						case 'get':
							const revisionKey = this.getNodeParameter('revisionKey', i) as string;
							endpoint = `/v1/revision/${registerType}/${revisionKey}`;
							break;
						case 'restore':
							const revisionKeyRestore = this.getNodeParameter('revisionKey', i) as string;
							endpoint = `/v1/revision/${registerType}/${revisionKeyRestore}`;
							method = 'POST';
							break;
					}
				}

				// ==================== PARAMETER ====================
				else if (resource === 'parameter') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/parameters';
							break;
					}
				}

				// ==================== CHAT ====================
				else if (resource === 'chat') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/chat-conversations';
							break;
						case 'create':
							endpoint = '/v1/chat-conversations';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
					}
				}

				// ==================== SEND MESSAGE ====================
				else if (resource === 'sendMessage') {
					switch (operation) {
						case 'send':
							const sendType = this.getNodeParameter('sendType', i) as string;
							endpoint = `/v1/send/${sendType}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
					}
				}

				// ==================== MEASURE ====================
				else if (resource === 'measure') {
					switch (operation) {
						case 'getAll':
							const locale = this.getNodeParameter('locale', i) as string;
							endpoint = `/v1/measures/${locale}`;
							break;
						case 'create':
							endpoint = '/v1/measure';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
					}
				}

				// ==================== USER BILLING ====================
				else if (resource === 'userBilling') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/user-billing';
							break;
					}
				}

				// ==================== UTILS ====================
				else if (resource === 'utils') {
					switch (operation) {
						case 'get':
							const utilsType = this.getNodeParameter('utilsType', i) as string;
							endpoint = `/v1/utils/${utilsType}`;
							break;
					}
				}

				// ==================== VACATION CALENDAR ====================
				else if (resource === 'vacationCalendar') {
					switch (operation) {
						case 'get':
							const propertyCode = this.getNodeParameter('propertyCode', i) as string;
							endpoint = `/v1/${propertyCode}/vacation-calendar`;
							break;
						case 'update':
							endpoint = '/v1/vacation-calendar';
							method = 'PUT';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
					}
				}

				// ==================== REALTOR ====================
				else if (resource === 'realtor') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/realtors';
							break;
					}
				}

				// ==================== REPORT ====================
				else if (resource === 'report') {
					switch (operation) {
						case 'siteAnalytics':
							endpoint = '/v1/reports/site-analytics';
							break;
						case 'userPerformance':
							if (qs.user_id) {
								endpoint = `/v1/reports/user-performance/${qs.user_id}`;
								delete qs.user_id;
							} else {
								endpoint = '/v1/reports/user-performance/';
							}
							break;
					}
				}

				// ==================== CREDIT ANALYSIS ====================
				else if (resource === 'creditAnalysis') {
					switch (operation) {
						case 'getAll':
							endpoint = '/v1/cf-analysis';
							break;
						case 'get':
							const analysisId = this.getNodeParameter('analysisId', i) as string;
							endpoint = `/v1/cf-analysis/${analysisId}`;
							break;
						case 'create':
							endpoint = '/v1/cf-analysis';
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'update':
							const analysisIdUpdate = this.getNodeParameter('analysisId', i) as string;
							endpoint = `/v1/cf-analysis/${analysisIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'delete':
							const analysisIdDelete = this.getNodeParameter('analysisId', i) as string;
							endpoint = `/v1/cf-analysis/${analysisIdDelete}`;
							method = 'DELETE';
							break;
						case 'getFee':
							endpoint = '/v1/analysis-fee';
							break;
					}
				}

				// ==================== REAL ESTATE POST ====================
				else if (resource === 'realEstatePost') {
					const postId = this.getNodeParameter('postId', i) as string;
					switch (operation) {
						case 'getComments':
							endpoint = `/v1/real-estate/posts/${postId}/comments`;
							break;
						case 'createComment':
							endpoint = `/v1/real-estate/posts/${postId}/comments`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'updateComment':
							const commentIdUpdate = this.getNodeParameter('commentId', i) as string;
							endpoint = `/v1/real-estate/posts/${postId}/comments/${commentIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'deleteComment':
							const commentIdDelete = this.getNodeParameter('commentId', i) as string;
							endpoint = `/v1/real-estate/posts/${postId}/comments/${commentIdDelete}`;
							method = 'DELETE';
							break;
						case 'getReplies':
							const commentIdReplies = this.getNodeParameter('commentId', i) as string;
							endpoint = `/v1/real-estate/posts/${postId}/comments/${commentIdReplies}/replies`;
							break;
						case 'createReply':
							const commentIdCreateReply = this.getNodeParameter('commentId', i) as string;
							endpoint = `/v1/real-estate/posts/${postId}/comments/${commentIdCreateReply}/replies`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'updateReply':
							const commentIdUpdateReply = this.getNodeParameter('commentId', i) as string;
							const replyIdUpdate = this.getNodeParameter('replyId', i) as string;
							endpoint = `/v1/real-estate/posts/${postId}/comments/${commentIdUpdateReply}/replies/${replyIdUpdate}`;
							method = 'POST';
							body = JSON.parse(this.getNodeParameter('bodyData', i) as string);
							break;
						case 'deleteReply':
							const commentIdDeleteReply = this.getNodeParameter('commentId', i) as string;
							const replyIdDelete = this.getNodeParameter('replyId', i) as string;
							endpoint = `/v1/real-estate/posts/${postId}/comments/${commentIdDeleteReply}/replies/${replyIdDelete}`;
							method = 'DELETE';
							break;
					}
				}

				// Make the API request
				const options: Record<string, unknown> = {
					method,
					url: `${baseUrl}${endpoint}`,
					headers: {
						'X-Imobzi-Secret': credentials.apiKey,
						'Content-Type': 'application/json',
					},
					qs: Object.keys(qs).length > 0 ? qs : undefined,
					body: body,
					json: true,
				};

				const response = await this.helpers.request(options);

				// Process response based on structure
				if (Array.isArray(response)) {
					// Direct array response (users, webhooks, integrations, etc.)
					returnData.push({
						json: {
							data: response,
							count: response.length,
						},
						pairedItem: { item: i },
					});
				} else if (typeof response === 'object' && response !== null) {
					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				} else {
					returnData.push({
						json: { result: response },
						pairedItem: { item: i },
					});
				}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
