import { useState } from "react";
import { Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is LinksHub?",
    answer:
      "LinksHub is a developer-focused profile that brings your projects, links, experience, and technical work into one place. Instead of sending someone across multiple platforms, you can share one profile that gives them the full context.",
  },
  {
    question: "What can I add to my profile?",
    answer:
      "You can showcase your projects, social links, GitHub repositories, introduction, skills, contact information, and other work you want people to discover.",
  },
  {
    question: "How does the AI assistant work?",
    answer:
      "LinksHub can understand the technical context of your projects and use that information to answer questions about your work. This gives visitors a way to explore your projects without having to dig through repositories themselves.",
  },
  {
    question: "Can I connect my GitHub account?",
    answer:
      "Yes. You can connect GitHub to bring repository information into your LinksHub profile. You can also provide project information manually when you don't want to connect your GitHub account.",
  },
  {
    question: "Do I need GitHub to use LinksHub?",
    answer:
      "No. GitHub is optional. You can create your profile and add project information manually without connecting a GitHub account.",
  },

];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white text-[var(--foreground)]"
    >
      {/* subtle horizontal editorial lines */}

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-18 sm:px-8 sm:py-36 lg:px-12 lg:py-24">
        {/* heading */}
        <div className="mx-auto mb-16 max-w-[850px] text-center sm:mb-20">
    

          <h2 className="font-serif text-[1.4rem] leading-[0.88] tracking-[-0.045em] sm:text-[2rem] lg:text-[3.5rem]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-[780px] border-t border-[var(--border)]">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="border-b border-[var(--border)]"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                >
                  <div className="flex min-w-0 items-start gap-5">
                    <span className="hidden pt-1 font-mono text-[9px] tracking-[0.15em] text-[var(--muted-foreground)] sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`font-sans text-lg font-medium leading-tight tracking-[-0.02em] transition-transform duration-300 sm:text-xl ${
                        isOpen ? "translate-x-1" : "group-hover:translate-x-1"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* sharp square control */}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--foreground)] transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 bg-[var(--foreground)] text-[var(--background)]"
                        : "bg-transparent text-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]"
                    }`}
                  >
                    <Plus
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300"
                    />
                  </span>
                </button>

                {/* answer */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-7 pl-0 pr-12 sm:pl-10 sm:pr-16">
                      <div className="mb-5 h-px w-12 bg-[var(--foreground)] opacity-30" />

                      <p className="max-w-[620px] text-sm leading-7 text-[var(--muted-foreground)] sm:text-[15px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


   
      </div>
    </section>
  );
};

export default FAQ;