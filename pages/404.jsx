import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { NotFoundIcon } from "@/src/Assets";

const NotFoundPage = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/")
  }, 3000)

  return (
    <div style={{ textAlign: "center" }}
    className='flex flex-col items-center justify-center h-screen bg-[#F6F4F0]'
    >
      <Head>
        <title>404 Not Found</title>
        <meta
          name="description"
          content="
          404 Not Found
          "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={NotFoundIcon}
        width={700}
        height={500}
        alt="error_image"
        style={{ display: "flex", margin: "50px auto" }}
        className="bg-[#F6F4F0]"
      />
      <Link href="/">
        <button>Back To Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;