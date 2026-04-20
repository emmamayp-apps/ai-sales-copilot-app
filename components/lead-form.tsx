"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { leadFormSchema, type LeadFormValues } from "@/lib/schema";

type LeadFormProps = {
  onGenerate: (values: LeadFormValues) => void;
};

export function LeadForm({ onGenerate }: LeadFormProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      company: "",
      role: "",
      contactName: "",
      context: "",
      valueProp: "",
      tone: "professional",
    },
  });

  function onSubmit(values: LeadFormValues) {
    onGenerate(values);
  }

  return (
    <Card className="border-white/60 bg-white/75 shadow-xl shadow-blue-100/40 backdrop-blur-sm">
      <CardHeader className="pb-5">
        <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
          <WandSparkles className="h-3.5 w-3.5" />
          Lead Input
        </div>
        <CardTitle className="text-2xl text-slate-900">Lead Details</CardTitle>
        <CardDescription className="text-sm text-slate-600">
          Add company context and the value proposition you want the AI to use.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Inc."
                      className="h-11 border-slate-200 bg-white/80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Head of Sales"
                      className="h-11 border-slate-200 bg-white/80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">Contact name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Smith"
                      className="h-11 border-slate-200 bg-white/80"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-500">
                    Optional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">Context</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you know about the company, lead, or current situation?"
                      rows={5}
                      className="min-h-[130px] border-slate-200 bg-white/80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valueProp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">
                    Product / Value Prop
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are you selling and why might it matter to this lead?"
                      rows={4}
                      className="min-h-[120px] border-slate-200 bg-white/80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">Tone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 border-slate-200 bg-white/80">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-slate-900 text-sm font-medium text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800"
            >
              Generate Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}