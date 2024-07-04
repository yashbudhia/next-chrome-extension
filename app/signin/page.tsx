"use client";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useSession } from "next-auth/react";

const languages = [
  { label: "College Student", value: "College-student" },
  { label: "School Student", value: "School-student" },
  { label: "Programmer", value: "programmer" },
  { label: "Business Owner", value: "business" },
  { label: "Doctor", value: "doctor" },
  { label: "Public servant", value: "government" },
  { label: "Organisation", value: "organisation" },
  { label: "Other", value: "Other" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  age: z.string().min(1, {
    message: "Age must not be empty.",
  }),
  occupation: z.string({
    required_error: "Please select an occupation",
  }),
  review: z.string().max(300, {
    message: "Maximum 300 characters allowed.",
  }),
  feedback: z.string().max(300, {
    message: "Maximum 300 characters allowed.",
  }),
});

export default function Signin() {
  const [currentstep, setCurrentstep] = useState(0);
  const { data: session } = useSession();
  const Express_URL = process.env.NEXT_PUBLIC_EXPRESS_URL;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      occupation: "",
      review: "",
      feedback: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        ...values,
        userId: session?.user?.id, // Include userId in the payload
      };
      const response = await axios.post(`${Express_URL}/feedback`, payload);
      console.log("Form submitted:", response.data);

      // Optionally, reset form after successful submission
      form.reset();

      toast({
        title: "Your feedback has reached us!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white"> Thanks for submitting.</code>
          </pre>
        ),
      });
    } catch (error) {
      console.log("Error submitting form:", error); // Log errors
    }
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center top-[120px] z-50 ">
        {currentstep === 0 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md"
            >
              <p>Fill in the details and continue</p>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>Enter your name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Age <br />
                    </FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        placeholder="age"
                        className="p-2 bg-inherit border rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your age.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Occupation</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select Occupation"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Occupation..." />
                          <CommandEmpty>No Occupation found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("occupation", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Choose the occupation which describes you best
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  type="button"
                  onClick={() => {
                    setCurrentstep(1);
                  }}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        )}
        {currentstep === 1 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md"
            >
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What do you like about this extension?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="This will go to the landing page..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How to improve it?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any 2 lines you want to write"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center gap-x-6">
                <Button type="button" onClick={() => setCurrentstep(0)}>
                  Previous
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </>
  );
}
