import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google"; 
import Link from "next/link";

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})
export default function Home() {
  console.log("hello");
  
  return (
    // <main className="flex h-full flex-col items-center
    //  justify-center 
    // bg-radial-[at_25%_75%] from-indigo-500 via-purple-500 to-pink-500 to_50%

    //  ">
    //   <div className="space-y-6 text-center">
    //     <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>🔐Auth</h1>
    //     <p className="text-lg text-white">A simple authentication service</p>
    //     <div>
    //       <LoginButton mode="modal" asChild>
    //         <Button variant="secondary" size="lg">Sign in</Button>
    //       </LoginButton>
          
    //    </div>
    //   </div>
      
    // </main>
     <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

      {/* Main content */}
      <div className="relative z-10 space-y-8 text-center px-4 max-w-4xl mx-auto">
        {/* Header section */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl">
            <span className="text-4xl">🔐</span>
          </div>

          <h1
            className={cn("text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight", font.className)}
          >
            Secure<span className="text-yellow-300">Auth</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            A Simple Authetication App
          </p>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-white font-semibold mb-2">Secure</h3>
            <p className="text-white/80 text-sm"></p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-white font-semibold mb-2">Simple</h3>
          </div>
        </div>

        {/* CTA section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LoginButton mode="modal" asChild>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
              >
                Sign In Now
              </Button>
            </LoginButton>
            <Link href={"/auth/register"}>
            <Button
              variant="default"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Register
            </Button>
            </Link>
          </div>
        </div>

        {/* Stats section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8 border-t border-white/20">
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300/60 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-pink-300/60 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-blue-300/60 rounded-full animate-pulse delay-500"></div>
    </main>
  );
}
