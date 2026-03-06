import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Mail, User, AlertCircle } from "lucide-react";
import { z } from "zod";

const AFFILIATE_LINK = "https://iqoption.net/lp/start/en/?aff=1616&afftrack=metodotrader&aff_model=revenue";

const signupSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
});

type FormData = z.infer<typeof signupSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (field: keyof FormData, value: string) => {
    try {
      signupSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const result = signupSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate processing then redirect
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        // Encode params safely
        const params = new URLSearchParams({
          email: encodeURIComponent(formData.email),
        });
        window.open(`${AFFILIATE_LINK}&${params.toString()}`, "_blank");
        setIsSubmitting(false);
        setIsSuccess(false);
        setFormData({ name: "", email: "" });
      }, 1500);
    }, 800);
  };

  const benefits = [
    "Conta demo com R$ 10.000 grátis",
    "Depósito mínimo de apenas R$ 60",
    "Suporte 24 horas em português",
  ];

  return (
    <section id="cadastro" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-medium/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-w-0">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                COMECE AGORA
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 break-words">
                Crie Sua Conta{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright">
                  Gratuitamente
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Junte-se a mais de 48 milhões de traders que confiam na IQ Option para suas operações.
              </p>

              {/* Benefits */}
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Card */}
            <div className="glass-card rounded-2xl p-4 sm:p-8 border border-border/50 shadow-[0_0_60px_hsl(168_100%_42%/0.1)] min-w-0">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Sucesso!</h3>
                  <p className="text-muted-foreground">Redirecionando para criar sua conta...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
                    Comece Agora Mesmo
                  </h3>

                  {/* Name Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={`pl-12 h-14 bg-secondary/50 border-border/50 focus:border-primary ${
                          errors.name ? "border-destructive" : ""
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Seu melhor email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={`pl-12 h-14 bg-secondary/50 border-border/50 focus:border-primary ${
                          errors.email ? "border-destructive" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>


                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-sm sm:text-base">
                        <span className="hidden sm:inline">Começar com Conta de Treinamento Grátis</span>
                        <span className="sm:hidden">Criar Conta Grátis</span>
                        <ArrowRight className="w-5 h-5 flex-shrink-0" />
                      </span>
                    )}
                  </Button>

                  {/* Terms */}
                  <p className="text-xs text-muted-foreground text-center">
                    Ao se cadastrar, você concorda com nossos{" "}
                    <a href="/termos-de-uso" className="text-primary hover:underline">
                      Termos de Uso
                    </a>{" "}
                    e{" "}
                    <a href="/politica-de-privacidade" className="text-primary hover:underline">
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
