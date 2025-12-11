import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ImobziApi implements ICredentialType {
	name = 'imobziApi';
	displayName = 'Imobzi API';
	documentationUrl = 'https://developer.imobzi.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Sua chave de API da Imobzi (X-Imobzi-Secret)',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.imobzi.app',
			description: 'URL base da API Imobzi',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Imobzi-Secret': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl || "https://api.imobzi.app"}}',
			url: '/v1/users',
			method: 'GET',
		},
	};
}
