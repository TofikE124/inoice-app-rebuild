"use client";
import Button from "./components/Button";
import { useTheme } from "next-themes";
import TextField from "./components/TextField";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="h-screen w-screen bg-pale-ghost dark:bg-deep-space">
      <div className="flex flex-col gap-2">
        The current theme is: {theme}
        <Button color="primary" onClick={() => setTheme("light")}>
          Light Mode
        </Button>
        <Button color="secondary" onClick={() => setTheme("dark")}>
          Dark Mode
        </Button>
      </div>
      <div className="p-10 flex gap-4">
        <Button color="primary">Tofik Elias</Button>
        <Button color="secondary">Tofik Elias</Button>
        <Button color="red">Tofik Elias</Button>
        <Button color="forstWhite">Tofik Elias</Button>
        <Button color="deepPurple">Tofik Elias</Button>
      </div>
      <div className="p-10">
        <TextField label="Text field" />
      </div>
    </main>
  );
}
