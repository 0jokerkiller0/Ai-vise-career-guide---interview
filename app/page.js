import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles, Factory,
  CheckCircle2, Users, Award,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      <section id="features" className="py-20 bg-[#003060]">
        <div className="mx-auto px-6 sm:px-6 lg:px-20 py-15 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-4">
              Comprehensive Career <span className="bg-gradient-to-r from-[#68BBE3] via-[#68BBE3] to-[#B3B2E9] bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From assessment to achievement, we provide end-to-end career guidance services
              tailored to help you succeed in your professional journey.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((features, index) => (
              <Card
                key={index}
                className="group bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg hover:shadow-[#B3B2E9]/20"
              >
                <CardHeader className="space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${features.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <features.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#003060] group-hover:text-[#0E86D4] transition-colors">
                      {features.title}
                    </CardTitle>
                    <CardDescription className="text-[#055C9D] mt-2">
                      {features.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {features.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-[#055C9D]">
                        <div className="w-1.5 h-1.5 bg-[#68BBE3] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-[#a9d0f7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
              Trusted by Thousands, <span className="bg-gradient-to-r from-[#003060] via-[#00aaff] to-[#7b7af0] bg-clip-text text-transparent">Powered by AI</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From personalized guidance to real interview practice, our platform delivers
              proven results across industries.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6 pt-8 p-8 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#055C9D] rounded-full mb-2 mx-auto">
                <Factory className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#000000]">50+</div>
              <div className="text-lg text-gray-700 ">Industories Covered</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#0E86D4] rounded-full mb-2 mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#000000]">10K+</div>
              <div className="text-lg text-gray-700 ">Interview Questions</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#0E86D4] rounded-full mb-2 mx-auto">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold  text-[#000000]">95%</div>
              <div className="text-lg text-gray-700 ">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#055C9D] rounded-full mb-2 mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#000000]">24/7</div>
              <div className="text-lg text-gray-700 ">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 bg-[#003060]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-4">
              How It <span className="bg-gradient-to-r from-[#68BBE3] via-[#68BBE3] to-[#B3B2E9] bg-clip-text text-transparent">Works ?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Four simple steps to accelerate your career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white p-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl text-white">{item.title}</h3>
                <p className="text-gray-300 max-w-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-[#003060]">
        <div className="container mx-auto px-4 md:px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-4">
              What Our Users <span className="bg-gradient-to-r from-[#68BBE3] via-[#68BBE3] to-[#B3B2E9] bg-clip-text text-transparent">Says</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card key={index} className="bg-background rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-gray-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-primary/20"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-primary">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-muted-foreground italic relative">
                        <span className="text-3xl text-primary absolute -top-4 -left-2">
                          &quot;
                        </span>
                        {testimonial.quote}
                        <span className="text-3xl text-primary absolute -bottom-4">
                          &quot;
                        </span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-2 bg-[#003060]">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-4">
             Frequently Asked <span className="bg-gradient-to-r from-[#68BBE3] via-[#68BBE3] to-[#B3B2E9] bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#a9d0f7]">
        <div className="mx-auto py-24 rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 mt-5 animate-bounce"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
