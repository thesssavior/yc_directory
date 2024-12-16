import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]" style={{background: "linear-gradient(to right, #759b46, #eda597)"}}>
        <h1 className="heading">Submit Your Class</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default Page;
