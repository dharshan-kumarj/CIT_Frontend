export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Quirky Navigation */}
      <nav className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center transform -rotate-12">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
              BizLink
            </h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
              How it works
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
              Support
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero - More Human & Conversational */}
        <section className="py-20">
          <div className="text-left max-w-4xl">
            <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-full mb-6">
              🚀 Currently helping 2,847 businesses grow
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              Stop searching.<br />
              Start <span className="text-orange-500 underline decoration-wavy decoration-orange-300">connecting</span>.
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl leading-relaxed">
              We're tired of vendors and distributors missing each other in the marketplace mess. 
              So we built something better. Something that actually works.
            </p>

            {/* Action Buttons - Less Perfect */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                I'm a Vendor 👋
                <div className="text-xs opacity-80 font-normal">Find distributors for my products</div>
              </button>
              <button className="group px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                I'm a Distributor 📦
                <div className="text-xs opacity-80 font-normal">Find products to distribute</div>
              </button>
            </div>

            {/* Login Links - Subtle */}
            <div className="flex gap-6 text-sm">
              <button className="text-gray-500 hover:text-orange-500 underline decoration-dotted">
                Already a vendor? Sign in
              </button>
              <button className="text-gray-500 hover:text-orange-500 underline decoration-dotted">
                Distributor login
              </button>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              The old way is broken 😤
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Vendors waste months cold-calling. Distributors miss great opportunities. 
              Everyone's frustrated with the endless back-and-forth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400">✕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Endless cold outreach</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Vendors spend 60% of their time just finding the right distributors</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400">✕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">No trust or verification</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Too many deals fall through due to unverified partners</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400">✕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Manual everything</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Contracts, training, onboarding - all scattered across different tools</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-2xl border-2 border-dashed border-orange-200 dark:border-orange-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Our solution is refreshingly simple:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Smart matching based on your needs</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Built-in verification & trust system</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Everything in one place</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Actually Works */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Here's how we fixed it 🔧
            </h2>
          </div>

          <div className="grid gap-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    You tell us what you need
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Vendors: "I have this product and need distributors in these regions"<br />
                  Distributors: "I want to sell products in these categories"
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  No more spray-and-pray approaches. Just be specific about what you want.
                </div>
              </div>
              <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-3xl">
                📝
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    We do the matchmaking
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our system finds the best matches and sends notifications. 
                  No more endless scrolling through irrelevant listings.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Think Tinder, but for business partnerships that actually matter.
                </div>
              </div>
              <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-3xl">
                💫
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Everything happens in one place
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Contracts, training, Slack workspace setup, progress tracking - 
                  we handle all the tedious stuff so you can focus on growing.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  No more juggling 15 different tools. Just one login, everything organized.
                </div>
              </div>
              <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-3xl">
                🏠
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof - Real Numbers */}
        <section className="py-16">
          <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-8">
              The numbers don't lie 📊
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-black text-orange-400 mb-2">847</div>
                <div className="text-gray-300 text-sm">successful partnerships this year</div>
              </div>
              <div>
                <div className="text-4xl font-black text-orange-400 mb-2">23 days</div>
                <div className="text-gray-300 text-sm">average time to find a partner</div>
              </div>
              <div>
                <div className="text-4xl font-black text-orange-400 mb-2">94%</div>
                <div className="text-gray-300 text-sm">of users say they'd recommend us</div>
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              * Real data from our platform. Updated monthly.
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to stop wasting time?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the platform that's changing how vendors and distributors connect. 
            No more cold calls. No more missed opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl">
              Get started for free →
            </button>
            <button className="px-10 py-5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500 font-medium text-lg rounded-xl transition-all duration-200">
              Book a demo
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            No credit card required. No lengthy onboarding. Just results.
          </p>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center transform -rotate-12">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-xl font-black text-gray-800 dark:text-white">BizLink</span>
            </div>
            
            <div className="flex gap-8 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Help</a>
            </div>
          </div>
          
          <div className="text-center mt-8 text-sm text-gray-400">
            © 2025 BizLink. Made with ☕ and lots of user feedback.
          </div>
        </div>
      </footer>
    </div>
  );
}
