"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";

import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import {
  budgets,
  contactFieldsSchema,
  contactLimits,
  projectTypes,
  type ContactFields,
} from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = "idle" | "submitting" | "success" | "error";

interface ApiResponse {
  ok?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFields, string[]>>;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  // Changing this key remounts the Turnstile widget, which resets it after a
  // failed submission (tokens are single-use).
  const [turnstileKey, setTurnstileKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactFieldsSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      projectType: undefined,
      budget: undefined,
      message: "",
    },
  });

  const projectType = useWatch({ control, name: "projectType" });
  const budget = useWatch({ control, name: "budget" });

  async function onSubmit(values: ContactFields) {
    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          turnstileToken: token,
          website: "",
        }),
      });

      const data = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          for (const [field, messages] of Object.entries(data.fieldErrors)) {
            if (messages?.[0]) {
              setError(field as keyof ContactFields, { message: messages[0] });
            }
          }
        }

        setServerError(
          data.error ??
            "We could not send your message. Please try again or email us directly.",
        );
        setStatus("error");
        setTurnstileKey((key) => key + 1);
        setToken("");
        return;
      }

      trackEvent("contact_submit", { projectType: values.projectType });
      reset();
      setToken("");
      setStatus("success");
    } catch {
      setServerError(
        "We could not reach the server. Check your connection and try again.",
      );
      setStatus("error");
      setTurnstileKey((key) => key + 1);
      setToken("");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="bg-card flex flex-col items-start rounded-2xl border p-6 sm:p-8"
      >
        <span className="bg-signal/20 text-signal-foreground grid size-11 place-items-center rounded-xl">
          <CheckCircle2 aria-hidden="true" className="size-5" />
        </span>
        <h2 className="mt-4 text-xl font-semibold tracking-tight">
          Thanks — your message is on its way
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          We have sent a copy to your inbox and will reply within one working day. If it
          is urgent, message us on{" "}
          <a
            href={site.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            WhatsApp
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="bg-foreground text-background inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium"
          >
            See our work
          </Link>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="border-border hover:bg-muted inline-flex h-10 items-center rounded-lg border px-4 text-sm font-medium"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-2xl border p-6 sm:p-8"
      aria-describedby={serverError ? "form-error" : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            maxLength={contactLimits.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-10"
            {...register("name")}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={contactLimits.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="h-10"
            {...register("email")}
          />
        </Field>

        <Field
          id="projectType"
          label="Project type"
          error={errors.projectType?.message}
        >
          <Select
            value={projectType ?? null}
            onValueChange={(value) =>
              setValue("projectType", value as ContactFields["projectType"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="projectType"
              aria-invalid={errors.projectType ? true : undefined}
              aria-describedby={errors.projectType ? "projectType-error" : undefined}
              className="h-10 w-full"
            >
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="budget" label="Approximate budget" error={errors.budget?.message}>
          <Select
            value={budget ?? null}
            onValueChange={(value) =>
              setValue("budget", value as ContactFields["budget"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="budget"
              aria-invalid={errors.budget ? true : undefined}
              aria-describedby={errors.budget ? "budget-error" : undefined}
              className="h-10 w-full"
            >
              <SelectValue placeholder="Choose a range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="message"
          label="What are you trying to build?"
          error={errors.message?.message}
          hint="A few sentences is plenty — the problem, who it is for, and any deadline."
        >
          <Textarea
            id="message"
            rows={6}
            placeholder="We need a website for our school with admissions information, a photo gallery and a way for parents to get in touch…"
            maxLength={contactLimits.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            {...register("message")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from users and assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {turnstileSiteKey ? (
        <div className="mt-6">
          <Turnstile
            key={turnstileKey}
            siteKey={turnstileSiteKey}
            onSuccess={setToken}
            onExpire={() => setToken("")}
            onError={() => setToken("")}
            options={{ theme: "auto", size: "flexible" }}
          />
        </div>
      ) : null}

      {serverError ? (
        <div
          id="form-error"
          role="alert"
          className="border-destructive/30 bg-destructive/5 text-destructive mt-6 flex items-start gap-2 rounded-lg border p-3 text-sm"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="xl"
          disabled={submitting || (Boolean(turnstileSiteKey) && !token)}
          className="w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-muted-foreground text-xs leading-5">
          {site.responseNote}. We never share your details.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <Label htmlFor={id} className="mb-1.5">
        {label}
      </Label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-muted-foreground mt-1.5 text-xs leading-5">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn("text-destructive mt-1.5 text-xs leading-5")}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
