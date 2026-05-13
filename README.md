# NativIA LP

Landing page institucional e comercial da NativIA, focada em apresentar a plataforma de IA corporativa privada para empresas.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4

## Requisitos

- Node.js `20.19+` ou `22.12+`
- npm com instalação de `optionalDependencies` habilitada

## Estrutura

- `src/components/landing`: seções da página
- `src/components/ui`: componentes base reutilizáveis
- `src/data`: conteúdo estático da LP
- `src/services`: integração com serviços externos
- `src/lib`: utilitários e validações
- `src/types`: tipos compartilhados

## Contato (formulário)

O envio do formulário usa `VITE_CONTACT_ENDPOINT`.

Exemplo:

```bash
VITE_CONTACT_ENDPOINT="https://seu-endpoint-de-leads"
```

Sem endpoint configurado, em ambiente de desenvolvimento o payload é apenas logado no console.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Troubleshooting (Windows)

Se aparecer `Cannot find native binding` (rolldown), execute uma reinstalação limpa:

```powershell
Get-Process node,npm -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
npm cache clean --force
npm install --include=optional
npm run dev
```

Se o `Remove-Item` falhar com `EACCES`, reinicie o Windows e rode os mesmos comandos novamente no PowerShell.
