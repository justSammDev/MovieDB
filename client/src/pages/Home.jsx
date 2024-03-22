import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("profile");
      window.location.reload();
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      setTimeout(() => {
        clearLocalStorage();
      }, 3600000);

      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);
  return (
    <main className=" mx-20 py-5">
      <div className=" flex gap-3 items-center justify-evenly py-10 h-3/4">
        <p className=" text-center flex-1 text-[5rem] sm: leading-none font-montserrat">
          This is
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Your{" "}
          </span>
          hub to{" "}
          <span className=" font-kanit italic text-8xl text-transparent bg-clip-text text-stroke">
            search{" "}
          </span>
          for all Movies and TvShows
        </p>
        <div className="hidden lg:flex lg:flex-1 w-full overflow-hidden border  border-none rounded ">
          <img
            src="../images/watchMovieTogether.jpg"
            alt="Watching movie together"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center justify-evenly sm:flex-row sm:justify-center sm:gap-5">
        <Link to="/movies">
          <button className="text-6xl border border-none hover:-translate-y-3 flex justify-center items-center rounded-3xl bg-primary text-black p-5 mt-3 sm:mt-0">
            Browse Movies <ArrowRight size={80} />
          </button>
        </Link>
        <Link to="tvShows">
          <button className="text-6xl border border-none hover:-translate-y-3 flex justify-center items-center rounded-3xl bg-secondary text-black p-5 mt-3 sm:mt-0">
            Browse TV <ArrowRight size={80} />
          </button>
        </Link>
      </div>
    </main>
  );
}
