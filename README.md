# Quiz Pokémon — Geração 1

Pequeno web app que implementa um quiz estilo "Pokedle" (modo clássico) usando a PokeAPI.

Status: este projeto já é um site estático (HTML/CSS/JS). Ele pode ser aberto localmente em um navegador ou hospedado em um serviço estático (GitHub Pages, Netlify, Vercel) para ser acessado apenas pela URL.

Como usar localmente
- Abra `index.html` no navegador (duplo clique funciona).
- Ou rode um servidor estático simples (recomendado) e abra `http://localhost:8000`:

```bash
python -m http.server 8000
# ou com Node (se tiver):
npx serve .
```

Observação: o app busca dados na PokeAPI (internet necessária). Em caso de falha, ele usa um fallback local parcial.

Hospedar como site estático (opções)

- GitHub Pages (recomendado se você usar GitHub):
  1. Crie um repositório no GitHub e empurre este projeto para a branch `main`.
  2. O repositório já inclui um workflow GitHub Actions que publica automaticamente os arquivos estáticos para o Pages. Após o push, aguarde alguns minutos e acesse `https://<seu-usuario>.github.io/<seu-repo>`.
  3. Se preferir, habilite Pages manualmente nas configurações do repositório (branch `gh-pages` ou `main`/`docs`), mas o workflow aqui usa a action para publicar.

  Exemplos de comandos:

  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
  git push -u origin main
  ```

- Netlify / Vercel:
  - Você pode conectar o repositório ao Netlify/Vercel e o deploy será feito automaticamente a partir da branch `main`.
  - Também é possível fazer `drag & drop` do diretório `.` no painel do Netlify para publicar rapidamente.

Notas finais
- O site já é estático; não há backend a ser executado no VS Code. Deploy em um host estático garante acesso via URL pública.
- Se quiser, eu posso:
  - Configurar deploy automático com outras opções (Netlify/Vercel).
  - Adicionar um arquivo JSON local com nomes/traduções para funcionar 100% offline.

Domínio customizado (opcional)

Se você quer que o site seja acessível em "pokedu.com", siga estes passos básicos:

- Adicione o arquivo `CNAME` na raiz do repositório (já criado aqui com `pokedu.com`).

- Configure o DNS do seu domínio:
  - Para GitHub Pages (usando branch `gh-pages` ou `main` conforme sua configuração):
    - Adicione registros A apontando para os IPs do GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
    - Ou crie um `CNAME` (registro tipo CNAME) apontando `www` para `<seu-usuario>.github.io` e use um redirecionamento do domínio raiz para `www` (ou ALIAS/ANAME se seu provedor suportar).
  - Aguarde a propagação DNS (pode levar até 24–48 horas, geralmente menos).

- No GitHub: vá em Settings → Pages e verifique se o domínio customizado está configurado (o workflow já publica os arquivos; GitHub reconhecerá o `CNAME`). Habilite HTTPS quando disponível.

Observações técnicas
- O arquivo `CNAME` na raiz do repositório instrui o GitHub Pages a responder por esse domínio. Já o DNS é responsabilidade do provedor onde você registrou `pokedu.com`.
- Se preferir, eu posso:
  - Gerar os registros DNS exatos para o seu provedor (informe qual é),
  - Fazer o commit e push para o repositório e testar o deploy, ou
  - Ajudar a configurar o redirecionamento `pokedu.com` → `www.pokedu.com` conforme sua preferência.

**Publicar no GitHub (passo a passo)**

Siga estes passos para publicar o site no GitHub Pages a partir da `main`:

1. Crie um repositório no GitHub (por exemplo `pokedu`).

2. No seu projeto local, inicialize o repositório Git (se ainda não tiver):

```bash
git init
git add .
git commit -m "Initial commit"
```

3. Adicione o remoto apontando para o repositório criado no GitHub e envie para `main`:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

4. O workflow `/.github/workflows/gh-pages.yml` já incluído publicará o conteúdo da raiz para o GitHub Pages sempre que você fizer push na `main`. Verifique a aba **Actions** no GitHub para acompanhar o job.

5. Se você deseja um domínio customizado (por exemplo `pokedu.com`):

  - Garanta que o arquivo `CNAME` contenha `pokedu.com` na raiz do repositório (já presente aqui).
  - Configure o DNS no seu registrador: adicione os registros A do GitHub Pages ou um registro CNAME para `www` apontando para `<seu-usuario>.github.io`.
  - No repositório GitHub vá em Settings → Pages e verifique o domínio customizado. Habilite HTTPS quando aparecer a opção.

6. Aguarde: após o workflow e a configuração DNS, o site deverá ficar disponível em `https://<seu-usuario>.github.io/<seu-repo>/` ou em `https://pokedu.com` após a propagação DNS.

Dicas de resolução de problemas

- Se o Actions falhar, abra a aba **Actions** e veja os logs do job.
- Se o domínio customizado não ficar disponível, verifique os registros DNS e a propagação (use `dig` ou ferramentas online).
- Se precisar, eu posso montar os comandos exatos para seu provedor DNS ou realizar o commit/push para o repositório (me passe o URL do repositório).
