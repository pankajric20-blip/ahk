"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { completeOnboarding } from "@/actions/onboarding";
import { ArrowRight, Globe, UserRound, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";

  // Form State
  const [language, setLanguageState] = useState("hi");
  const [userType, setUserType] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setLanguage } = useLanguage();

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    // Set the global language context immediately so the user experiences the app in their preferred language
    if (language === "hi" || language === "en" || language === "hinglish") {
      setLanguage(language as any);
    }

    const formData = new FormData();
    formData.append("language", language);
    formData.append("userType", userType);
    formData.append("city", city);
    formData.append("next", nextPath);

    const result = await completeOnboarding(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
    // Success redirects in server action
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-lg p-8 rounded-3xl border bg-card text-card-foreground shadow-2xl relative overflow-hidden">
        {/* Progress Bar background effect */}
        <div
          className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            {step === 1 && <Globe className="w-6 h-6" />}
            {step === 2 && <UserRound className="w-6 h-6" />}
            {step === 3 && <MapPin className="w-6 h-6" />}
            {step === 4 && <Sparkles className="w-6 h-6" />}
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            {step === 1 && "Choose Your Language"}
            {step === 2 && "How will you use AIHKYA?"}
            {step === 3 && "Where are you from?"}
            {step === 4 && "You're All Set!"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {step === 1 &&
              "Language preferences help us tailor the tools to your comfort."}
            {step === 2 && "We'll suggest tools based on your profession."}
            {step === 3 &&
              "This creates localized recommendations & trending insights."}
            {step === 4 && "We're curating the best AI tools for you."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Step 1: Language */}
          {step === 1 && (
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: "hi", label: "हिंदी", desc: "Hindi First" },
                {
                  id: "hinglish",
                  label: "Hinglish",
                  desc: "Mix of Hindi & English",
                },
                { id: "en", label: "English", desc: "English Only" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguageState(lang.id)}
                  className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all ${
                    language === lang.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <span className="font-bold text-lg">{lang.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {lang.desc}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: User Type */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "student", label: "Student" },
                { id: "business_owner", label: "Business Owner / MSME" },
                { id: "creator", label: "Content Creator" },
                { id: "freelancer", label: "Freelancer" },
                { id: "developer", label: "Developer" },
                { id: "other", label: "Other" },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setUserType(type.id)}
                  className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all text-left ${
                    userType === type.id
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  City (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Delhi, Bangalore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full flex h-12 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
          )}

          {/* Step 4: Final */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <p className="text-lg font-medium">
                Ready to discover AI tools tailored for you.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <button
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            className="text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-0 transition-opacity"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={step === 2 && !userType}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-2.5 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
            >
              {isSubmitting ? "Setting up..." : "Let's Go!"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
