"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="glass rounded-2xl border border-white/10 bg-card/40 p-4 sm:p-6">
            <h1 className="mb-2 text-xl font-bold text-foreground">
              الانضمام للاتحاد
            </h1>
            <p className="mb-6 text-sm text-muted-foreground">
              برجاء إكمال نموذج الانضمام بالأسفل.
            </p>

            {/* ✅ GHL Survey Embed */}
            <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/10">
              <iframe
                src="https://link.icu-uk.org/widget/survey/k0FocHZgDZMVMnAcjEgw"
                style={{ border: "none", width: "100%" }}
                scrolling="no"
                id="k0FocHZgDZMVMnAcjEgw"
                title="survey"
              />
            </div>

            {/* ✅ Load the embed script (handles auto-height عادةً) */}
            <Script
              src="https://link.icu-uk.org/js/form_embed.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}