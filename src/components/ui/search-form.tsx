"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export type SearchFormGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
} & T;

export function SearchForm({
  children,
  className,
  handleSubmit,
}: SearchFormGenericProps) {
  return (
    <form className={cn([" sm:w-[40rem] ", className])} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

interface SearchBarProps {
  className?: string;
  form: any;
}

export function SearchBar({ className, form }: SearchBarProps) {
  return (
    <Input
      name="search"
      placeholder="Search for a character"
      className={className}
      {...form.register("search")}
    />
  );
}

export type SearchFormGroupGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function SearchFormGroup({
  children,
  className,
  ...props
}: SearchFormGroupGenericProps) {
  return <div className={cn(["flex"], className)}>{children}</div>;
}

export type SearchFormButtonGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function SearchFormButton({
  children,
  className,
  ...props
}: SearchFormButtonGenericProps) {
  return <div className={className}>{children}</div>;
}

export type SearchFormFilterProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function SearchFormFilter({
  children,
  className,
}: SearchFormFilterProps) {
  return <div className={cn(["flex gap-2"], className)}>{children}</div>;
}
