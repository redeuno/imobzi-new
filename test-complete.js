#!/usr/bin/env node

/**
 * TESTE COMPLETO DO NODE N8N - IMOBZI
 * 
 * Este script testa:
 * 1. Carregamento dos arquivos compilados
 * 2. Estrutura das classes
 * 3. Validação das propriedades obrigatórias
 * 4. Simulação de carregamento pelo n8n
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('TESTE COMPLETO DO NODE IMOBZI');
console.log('='.repeat(80));
console.log();

// Cores para o console
const colors = {
	reset: '\x1b[0m',
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
};

function log(message, color = 'reset') {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
	totalTests++;
	try {
		fn();
		passedTests++;
		log(`✓ ${name}`, 'green');
		return true;
	} catch (error) {
		failedTests++;
		log(`✗ ${name}`, 'red');
		log(`  Erro: ${error.message}`, 'red');
		return false;
	}
}

// ============================================================================
// TESTE 1: Verificar estrutura de arquivos
// ============================================================================
log('\n1. ESTRUTURA DE ARQUIVOS', 'blue');
log('-'.repeat(80));

const requiredFiles = [
	'dist/credentials/ImobziApi.credentials.js',
	'dist/nodes/Imobzi/Imobzi.node.js',
	'dist/nodes/ImobziSimples/ImobziSimples.node.js',
	'dist/nodes/ImobziWebhook/ImobziWebhook.node.js',
	'dist/nodes/Imobzi/imobzi.svg',
	'dist/nodes/ImobziSimples/imobzi.svg',
	'dist/nodes/ImobziWebhook/imobzi.svg',
	'package.json',
	'index.js',
];

requiredFiles.forEach(file => {
	test(`Arquivo existe: ${file}`, () => {
		if (!fs.existsSync(file)) {
			throw new Error(`Arquivo não encontrado: ${file}`);
		}
	});
});

// ============================================================================
// TESTE 2: Validar package.json
// ============================================================================
log('\n2. VALIDAÇÃO DO PACKAGE.JSON', 'blue');
log('-'.repeat(80));

let packageJson;
test('Ler package.json', () => {
	const content = fs.readFileSync('package.json', 'utf8');
	packageJson = JSON.parse(content);
});

if (packageJson) {
	test('Campo "name" definido', () => {
		if (!packageJson.name) throw new Error('Campo "name" não definido');
	});

	test('Campo "version" definido', () => {
		if (!packageJson.version) throw new Error('Campo "version" não definido');
	});

	test('Campo "n8n" definido', () => {
		if (!packageJson.n8n) throw new Error('Campo "n8n" não definido');
	});

	test('Credentials definidos', () => {
		if (!packageJson.n8n.credentials || packageJson.n8n.credentials.length === 0) {
			throw new Error('Nenhuma credential definida');
		}
	});

	test('Nodes definidos', () => {
		if (!packageJson.n8n.nodes || packageJson.n8n.nodes.length === 0) {
			throw new Error('Nenhum node definido');
		}
	});

	// Verificar se os arquivos listados existem
	packageJson.n8n.credentials.forEach(cred => {
		test(`Credential existe: ${cred}`, () => {
			if (!fs.existsSync(cred)) {
				throw new Error(`Arquivo não encontrado: ${cred}`);
			}
		});
	});

	packageJson.n8n.nodes.forEach(node => {
		test(`Node existe: ${node}`, () => {
			if (!fs.existsSync(node)) {
				throw new Error(`Arquivo não encontrado: ${node}`);
			}
		});
	});
}

// ============================================================================
// TESTE 3: Carregar e validar credentials
// ============================================================================
log('\n3. VALIDAÇÃO DAS CREDENTIALS', 'blue');
log('-'.repeat(80));

let ImobziApi;
test('Carregar ImobziApi.credentials.js', () => {
	ImobziApi = require('./dist/credentials/ImobziApi.credentials.js').ImobziApi;
	if (!ImobziApi) throw new Error('Classe ImobziApi não exportada');
});

if (ImobziApi) {
	test('Instanciar ImobziApi', () => {
		const instance = new ImobziApi();
		if (!instance) throw new Error('Não foi possível instanciar ImobziApi');
	});

	const credInstance = new ImobziApi();

	test('Propriedade "name" definida', () => {
		if (!credInstance.name) throw new Error('Propriedade "name" não definida');
	});

	test('Propriedade "displayName" definida', () => {
		if (!credInstance.displayName) throw new Error('Propriedade "displayName" não definida');
	});

	test('Propriedade "properties" definida', () => {
		if (!credInstance.properties) throw new Error('Propriedade "properties" não definida');
	});

	test('Propriedade "authenticate" definida', () => {
		if (!credInstance.authenticate) throw new Error('Propriedade "authenticate" não definida');
	});

	log(`\n  → name: "${credInstance.name}"`, 'yellow');
	log(`  → displayName: "${credInstance.displayName}"`, 'yellow');
}

// ============================================================================
// TESTE 4: Carregar e validar nodes
// ============================================================================
log('\n4. VALIDAÇÃO DOS NODES', 'blue');
log('-'.repeat(80));

const nodes = [
	{ name: 'Imobzi', file: './dist/nodes/Imobzi/Imobzi.node.js' },
	{ name: 'ImobziSimples', file: './dist/nodes/ImobziSimples/ImobziSimples.node.js' },
	{ name: 'ImobziWebhook', file: './dist/nodes/ImobziWebhook/ImobziWebhook.node.js' },
];

nodes.forEach(({ name, file }) => {
	log(`\n  ${name}:`, 'yellow');
	
	let NodeClass;
	test(`  ↳ Carregar ${name}`, () => {
		NodeClass = require(file)[name];
		if (!NodeClass) throw new Error(`Classe ${name} não exportada`);
	});

	if (NodeClass) {
		let instance;
		test(`  ↳ Instanciar ${name}`, () => {
			instance = new NodeClass();
			if (!instance) throw new Error(`Não foi possível instanciar ${name}`);
		});

		if (instance) {
			test(`  ↳ Propriedade "description" definida`, () => {
				if (!instance.description) throw new Error('Propriedade "description" não definida');
			});

			if (instance.description) {
				test(`  ↳ description.displayName definido`, () => {
					if (!instance.description.displayName) throw new Error('displayName não definido');
				});

				test(`  ↳ description.name definido`, () => {
					if (!instance.description.name) throw new Error('name não definido');
				});

				test(`  ↳ description.version definido`, () => {
					if (!instance.description.version) throw new Error('version não definido');
				});

				test(`  ↳ description.credentials definido`, () => {
					if (!instance.description.credentials) throw new Error('credentials não definido');
				});

				test(`  ↳ description.properties definido`, () => {
					if (!instance.description.properties) throw new Error('properties não definido');
				});

				log(`\n    → displayName: "${instance.description.displayName}"`, 'yellow');
				log(`    → name: "${instance.description.name}"`, 'yellow');
				log(`    → version: ${instance.description.version}`, 'yellow');
			}

			// Verificar métodos
			if (name !== 'ImobziWebhook') {
				test(`  ↳ Método "execute" definido`, () => {
					if (typeof instance.execute !== 'function') {
						throw new Error('Método "execute" não é uma função');
					}
				});
			} else {
				test(`  ↳ Método "webhook" definido`, () => {
					if (typeof instance.webhook !== 'function') {
						throw new Error('Método "webhook" não é uma função');
					}
				});
			}
		}
	}
});

// ============================================================================
// TESTE 5: Verificar ícones SVG
// ============================================================================
log('\n5. VALIDAÇÃO DOS ÍCONES SVG', 'blue');
log('-'.repeat(80));

const svgFiles = [
	'dist/nodes/Imobzi/imobzi.svg',
	'dist/nodes/ImobziSimples/imobzi.svg',
	'dist/nodes/ImobziWebhook/imobzi.svg',
];

svgFiles.forEach(file => {
	test(`Ícone existe: ${file}`, () => {
		if (!fs.existsSync(file)) {
			throw new Error(`Ícone não encontrado: ${file}`);
		}
		const content = fs.readFileSync(file, 'utf8');
		if (!content.includes('<svg')) {
			throw new Error(`Arquivo não é um SVG válido: ${file}`);
		}
	});
});

// ============================================================================
// TESTE 6: Verificar compatibilidade com n8n
// ============================================================================
log('\n6. COMPATIBILIDADE COM N8N', 'blue');
log('-'.repeat(80));

test('index.js existe e exporta', () => {
	if (!fs.existsSync('index.js')) {
		throw new Error('index.js não encontrado');
	}
	const content = fs.readFileSync('index.js', 'utf8');
	if (!content.includes('module.exports')) {
		throw new Error('index.js não exporta nada');
	}
});

// ============================================================================
// RELATÓRIO FINAL
// ============================================================================
log('\n' + '='.repeat(80), 'blue');
log('RELATÓRIO FINAL', 'blue');
log('='.repeat(80), 'blue');
log();
log(`Total de testes: ${totalTests}`, 'yellow');
log(`✓ Passou: ${passedTests}`, 'green');
log(`✗ Falhou: ${failedTests}`, failedTests > 0 ? 'red' : 'green');
log();

if (failedTests === 0) {
	log('🎉 TODOS OS TESTES PASSARAM!', 'green');
	log('O node está pronto para ser instalado no n8n.', 'green');
	log();
	log('Para instalar:', 'yellow');
	log('  npm pack', 'yellow');
	log('  npm install -g mantovani.bruno-n8n-nodes-imobzi-new-1.2.0.tgz', 'yellow');
	log();
	process.exit(0);
} else {
	log('❌ ALGUNS TESTES FALHARAM!', 'red');
	log('Corrija os erros acima antes de instalar o node.', 'red');
	log();
	process.exit(1);
}

