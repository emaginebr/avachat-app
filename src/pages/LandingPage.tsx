import { Link } from 'react-router-dom'
import ChatWidget from '../components/chat/ChatWidget'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ava-600 text-white shadow-md shadow-ava-600/25">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Avachat</span>
          </a>
          <Link
            to="/admin/agents"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-ava-200 hover:bg-ava-50 hover:text-ava-700"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-ava-100/60 blur-3xl" />
          <div className="absolute -left-20 top-40 h-[300px] w-[300px] rounded-full bg-ava-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ava-200 bg-ava-50 px-4 py-1.5 text-sm font-medium text-ava-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ava-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ava-500" />
              </span>
              Plataforma de agentes inteligentes
            </div>

            <h1 className="font-display text-5xl leading-tight tracking-tight text-gray-900 md:text-7xl md:leading-[1.1]">
              Converse com seus
              <span className="relative mx-2 inline-block text-ava-600">
                clientes
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8.5C50 2.5 150 2.5 198 8.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              usando IA
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500 md:text-xl">
              Crie agentes de IA personalizados que entendem seu negocio,
              respondem em tempo real e coletam dados dos visitantes de
              forma natural e conversacional.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 rounded-xl bg-ava-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ava-600/25 transition-all hover:bg-ava-700 hover:shadow-xl hover:shadow-ava-600/30"
              >
                Comece agora
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
              <Link
                to="/admin/agents"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                Acessar painel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-gray-900 md:text-4xl">
              Tudo que voce precisa para
              <em className="not-italic text-ava-600"> automatizar </em>
              seu atendimento
            </h2>
            <p className="mt-4 text-gray-500">
              Uma plataforma completa para criar, treinar e publicar agentes de IA que
              representam seu negocio.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-ava-200 hover:shadow-lg hover:shadow-ava-100/50">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-ava-50 text-ava-600 ring-1 ring-ava-100 transition-colors group-hover:bg-ava-600 group-hover:text-white group-hover:ring-ava-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Agentes inteligentes</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Crie agentes com prompts personalizados que entendem o contexto do seu negocio.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-ava-200 hover:shadow-lg hover:shadow-ava-100/50">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-ava-50 text-ava-600 ring-1 ring-ava-100 transition-colors group-hover:bg-ava-600 group-hover:text-white group-hover:ring-ava-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                  <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Base de conhecimento</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Alimente seus agentes com documentos para respostas precisas e contextualizadas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-ava-200 hover:shadow-lg hover:shadow-ava-100/50">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-ava-50 text-ava-600 ring-1 ring-ava-100 transition-colors group-hover:bg-ava-600 group-hover:text-white group-hover:ring-ava-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Chat em tempo real</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Respostas instantaneas com streaming — seus visitantes veem a IA pensando em tempo real.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-ava-200 hover:shadow-lg hover:shadow-ava-100/50">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-ava-50 text-ava-600 ring-1 ring-ava-100 transition-colors group-hover:bg-ava-600 group-hover:text-white group-hover:ring-ava-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Coleta de leads</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Capture nome, email e telefone de forma natural, direto na conversa com o agente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="como-funciona" className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-gray-900 md:text-4xl">
              Tres passos para
              <em className="not-italic text-ava-600"> transformar </em>
              seu atendimento
            </h2>
            <p className="mt-4 text-gray-500">
              Configure seu agente em minutos e comece a atender automaticamente.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-ava-600 font-display text-2xl text-white shadow-lg shadow-ava-600/25">
                1
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Crie seu agente</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Defina o nome, a personalidade e o prompt de sistema do seu agente.
                Escolha quais dados dos visitantes deseja coletar.
              </p>
              {/* Connector line (desktop) */}
              <div className="pointer-events-none absolute right-0 top-8 hidden w-[calc(50%-2rem)] border-t-2 border-dashed border-ava-200 md:block lg:translate-x-[calc(100%+1rem)]" />
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-ava-600 font-display text-2xl text-white shadow-lg shadow-ava-600/25">
                2
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Alimente com conhecimento</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Faca upload de documentos, FAQs e manuais. O agente aprende e
                usa essas informacoes para responder com precisao.
              </p>
              <div className="pointer-events-none absolute right-0 top-8 hidden w-[calc(50%-2rem)] border-t-2 border-dashed border-ava-200 md:block lg:translate-x-[calc(100%+1rem)]" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-ava-600 font-display text-2xl text-white shadow-lg shadow-ava-600/25">
                3
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Publique e converse</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Seu agente fica disponivel instantaneamente. Os visitantes conversam
                pelo widget integrado em seu site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl bg-ava-950 px-8 py-16 text-center md:px-16">
            {/* Decorative elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-ava-600/20 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-ava-400/10 blur-2xl" />
            </div>

            <div className="relative">
              <h2 className="font-display text-3xl text-white md:text-4xl">
                Pronto para comecar?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-ava-200">
                Acesse o painel administrativo, crie seu primeiro agente e
                veja a IA trabalhando por voce.
              </p>
              <Link
                to="/admin/agents"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-ava-900 shadow-lg transition-all hover:bg-ava-50 hover:shadow-xl"
              >
                Acessar painel administrativo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ava-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">Avachat</span>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Avachat. Todos os direitos reservados.</p>
        </div>
      </footer>

      <ChatWidget slug="biia" greeting="Oi, eu sou a Biia. Em que posso ajudar?" />
    </div>
  )
}

export default LandingPage
