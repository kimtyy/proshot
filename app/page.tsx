"use client";

import Image from "next/image";
import UploadCard from "./components/UploadCard";
import { CATEGORIES, STYLES } from "./lib/styles";

export default function Home() {
  const scrollToUpload = () => {
    const element = document.getElementById("upload-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50/40 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 blur-3xl opacity-75" />
        <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-100/30 to-amber-100/20 blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-sky-100/30 to-indigo-100/20 blur-3xl opacity-50" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-950 font-outfit">
              ProShot
            </span>
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">이용 방법</a>
            <a href="#showcase" className="hover:text-indigo-600 transition-colors">스타일 갤러리</a>
          </nav>
          <div>
            <button
              onClick={scrollToUpload}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-slate-950/5 active:scale-[0.98]"
            >
              시작하기
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 px-6 max-w-7xl mx-auto text-center">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100/80 mb-8 animate-fade-in shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          AI 포토 스튜디오
        </div>

        {/* Main Korean Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto text-balance">
          셀카 한 장이면,<br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
            증명사진부터 컨셉 화보까지
          </span>
        </h1>

        {/* Subheadline (one-line) */}
        <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-8 leading-relaxed text-balance">
          취업용 증명사진, 여권사진, 비즈니스 헤드샷, 아이돌 프로필, 나만의 커스텀 컨셉까지 — 스튜디오 예약 없이 5분 만에
        </p>

        {/* Category chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 text-slate-600 border border-slate-200/80 shadow-sm"
            >
              {cat.emoji} {cat.label}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
            🖨️ 인화용 시트 자동 생성
          </span>
        </div>

        {/* Primary CTA button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={scrollToUpload}
            className="group relative inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-8 py-4.5 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-950/10 hover:shadow-2xl hover:shadow-indigo-500/20 active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              내 헤드샷 만들기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <span className="text-xs text-slate-400 font-semibold tracking-wide">
            카드 등록 불필요 · 12가지 스타일 + 커스텀 · 5분 내 고화질 완성
          </span>
        </div>
      </section>

      {/* Before-After Showcase Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="relative bg-white/60 backdrop-blur-md rounded-3xl border border-slate-100/80 p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Before Card */}
          <div className="w-full md:w-5/12 flex flex-col items-center">
            <div className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-2xl overflow-hidden shadow-md border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/images/selfie_before.png"
                alt="원본 셀카 사진"
                fill
                sizes="(max-width: 768px) 240px, 272px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 bg-rose-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Before: 일상 셀카
              </div>
            </div>
          </div>

          {/* Connection Indicator */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 shadow-md text-indigo-600 animate-bounce">
              <svg className="w-6 h-6 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <span className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-2.5 py-0.5 rounded-full">
              ProShot AI
            </span>
          </div>

          {/* After Card */}
          <div className="w-full md:w-5/12 flex flex-col items-center">
            <div className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-300 ring-4 ring-indigo-500/5">
              <Image
                src="/images/profile_after.png"
                alt="AI 생성 프로필 헤드샷"
                fill
                sizes="(max-width: 768px) 240px, 272px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 bg-indigo-600/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                After: AI 프로필 헤드샷
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload & Style Selection Section */}
      <section id="upload-section" className="max-w-5xl mx-auto px-6 pb-24 scroll-mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            나만의 AI 사진 만들기
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            정면을 또렷하게 바라보는 일상 셀카를 업로드하고, 증명사진부터 컨셉 화보까지 원하는 스타일을 골라보세요.
          </p>
        </div>
        <UploadCard />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-slate-100/40 border-y border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4 sm:text-4xl">
              어떻게 작동하나요?
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              번거로운 방문 예약과 메이크업 준비 없이, 단 3단계로 고해상도 이미지 완성
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-100/80 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">일상 셀카 선택</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                스마트폰 앨범에 있는 평소의 자연스러운 얼굴 셀카 1장을 선택해 업로드합니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-slate-100/80 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">스타일 선택</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                비즈니스 헤드샷, 규격 증명·여권사진, 재미있는 컨셉 화보 중 선택하거나 원하는 스타일을 직접 글로 설명하면 AI가 매칭합니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-100/80 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">즉시 다운로드 & 인화</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                초고해상도 결과물을 바로 다운로드하고, 증명사진은 재단선이 그려진 인화용 시트로 받아 사진관에서 그대로 출력하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Style Gallery / Showcase Section */}
      <section id="showcase" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4 sm:text-4xl">
            12가지 스타일 + 나만의 커스텀
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            이력서·여권부터 아이돌 프로필, 90년대 졸업앨범까지 — 원하는 컨셉은 직접 글로 만들 수도 있어요
          </p>
        </div>

        {/* Full style lineup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16">
          {STYLES.map((style) => (
            <div
              key={style.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-2">{style.emoji}</span>
              <span className="text-sm font-bold text-slate-800 leading-tight">{style.label}</span>
              <span className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">
                {style.description}
              </span>
            </div>
          ))}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-4 shadow-md flex flex-col items-center justify-center text-center text-white">
            <span className="text-3xl mb-2">✍️</span>
            <span className="text-sm font-bold leading-tight">커스텀 스타일</span>
            <span className="text-[11px] text-indigo-100 font-medium mt-1 leading-tight">
              원하는 컨셉을 직접 글로 설명
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Woman Showcase Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden mb-6 shadow-inner">
              <Image
                src="/images/profile_woman.png"
                alt="여성 비즈니스 프로필 사진 스타일"
                fill
                sizes="(max-width: 768px) 280px, 280px"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                이력서 및 포트폴리오
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-4">모던 스마트 아웃핏</h3>
              <p className="text-slate-500 text-xs mt-1 px-4">
                자연스러운 헤어 라인과 은은한 미색 톤 스튜디오 배경의 그레이 블레이저 아웃핏
              </p>
            </div>
          </div>

          {/* Man Showcase Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden mb-6 shadow-inner">
              <Image
                src="/images/profile_after.png"
                alt="남성 비즈니스 프로필 사진 스타일"
                fill
                sizes="(max-width: 768px) 280px, 280px"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                링크드인 및 사내 프로필
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-4">클래식 코퍼레이트</h3>
              <p className="text-slate-500 text-xs mt-1 px-4">
                신뢰감을 선사하는 깔끔한 수트 정장 및 단정하게 떨어지는 핏감의 정석
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full blur-[80px] opacity-35" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500 rounded-full blur-[80px] opacity-35" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              지금 바로 나만의 AI 사진을 제작해 보세요
            </h2>
            <p className="text-indigo-200 text-sm md:text-base mb-8 leading-relaxed max-w-lg mx-auto text-balance">
              스튜디오 예약 비용과 대기 시간 없이 — 증명사진, 헤드샷, 컨셉 화보를 지금 업로드 한 번으로 완성하세요.
            </p>
            <button
              onClick={scrollToUpload}
              className="group relative inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-white/5 hover:shadow-xl hover:shadow-white/10"
            >
              내 헤드샷 만들기
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 font-outfit">ProShot</span>
            <span>— AI CITY BUILDERS</span>
          </div>
          <div>
            <p>© 2026 ProShot. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
