i:
	rm -rf node_modules
	npm install

l:
	npm run lint

f:
	npm run format

tc:
	npm run type-check

d:
	npm  run dev

b:
	rm -rf dist
	npm run build
	
cl:
	rm -rf dist

tr:
	tree -I 'node_modules|.vscode|dist'