import { useState } from "react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { useCreateLink } from "./useCreateLink";

function CreateLinkForm() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  const { mutate, isPending } = useCreateLink();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        setFormData({
          title: "",
          url: "",
        });
      },
    });
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-white text-xl font-bold mb-8">
        Create Link
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />

        <Input
          label="URL"
          name="url"
          value={formData.url}
          onChange={(e) =>
            setFormData({
              ...formData,
              url: e.target.value,
            })
          }
        />

        <Button disabled={isPending}>
          {isPending
            ? "Creating..."
            : "Create Link"}
        </Button>
      </form>
    </div>
  );
}

export default CreateLinkForm;