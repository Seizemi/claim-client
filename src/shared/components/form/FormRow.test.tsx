import { render, screen, within } from "@testing-library/react";
import FormRow from "shared/components/form/FormRow";

test("names the group of controls after its label", () => {
  render(
    <>
      <FormRow label="Nom du client">
        <input type="text" />
      </FormRow>
      <FormRow label="Canal de vente">
        <select />
      </FormRow>
    </>
  );

  expect(within(screen.getByRole("group", { name: "Nom du client" })).getByRole("textbox")).toBeInTheDocument();
  expect(within(screen.getByRole("group", { name: "Canal de vente" })).getByRole("combobox")).toBeInTheDocument();
});
