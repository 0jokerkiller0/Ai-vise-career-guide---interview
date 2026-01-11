"use client";
import { ArrowRight, Target, Users, Award } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="pt-16 bg-gradient-to-br from-[#003060] to-[#012345]"
    >
      {/* Two column layout */}
      <div className="mx-auto px-6 sm:px-6 lg:px-20 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE: Text + CTA + Stats */}
          <div className="space-y-8">
            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffffff] leading-tight">
                Shape Your <span className="bg-gradient-to-r from-[#68BBE3] via-[#68BBE3] to-[#B3B2E9] bg-clip-text text-transparent">Future</span> with Expert
                <span className="bg-gradient-to-r from-[#68BBE3] via-[#68BBE3] to-[#B3B2E9] bg-clip-text text-transparent"> Career Guidance</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Advance your career with personalized guidance, interview prep, and
                AI-powered tools for job success.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#68BBE3] to-[#8180DB] hover:opacity-90 text-black px-8 py-3 group transition-all duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

              </Link>

              <Link href="demo_video.mp4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#0E86D4] text-[#0E86D4] hover:bg-[#0E86D4] hover:text-white px-8 py-3"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#68BBE3] rounded-full mb-2 mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#ffffff]">10K+</div>
                <div className="text-sm text-gray-300">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#0E86D4] rounded-full mb-2 mx-auto">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold  text-[#ffffff]">95%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#055C9D] rounded-full mb-2 mx-auto">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#ffffff]">15+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Image */}
          <div className="relative" ref={imageRef}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/Career-progress.gif"
                alt="Career guidance counseling session"
                className="w-full h-full object-cover"
              />
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[#003060]">
                    Live Career Consultation
                  </span>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#68BBE3] rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#0E86D4] rounded-full opacity-30"></div>
          </div>

        </div>
      </div>
    </section>

  );
};

export default HeroSection;
