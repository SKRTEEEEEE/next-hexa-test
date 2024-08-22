"use client"
import { updateUser } from "@/actions/user-role";
import { Button } from "./ui/button";
import { ExtendedJWTPayload } from "@/types/auth";
import { useActiveAccount } from "thirdweb/react";
import { signLoginPayload } from "thirdweb/auth";
import { FormEvent, useEffect } from "react";
import { generatePayload } from "@/actions/auth";
import { CConectButton } from "./custom-connect-button";



export default function UserForm({ jwt }: { jwt: ExtendedJWTPayload }) {
  const account =  useActiveAccount()
  useEffect(() => {
    console.log("account updated: ", account);
  }, [account]);
  console.log("!account: ",!account)
  async function handleClick(formData: FormData) {
    if(!account){
      throw new Error("Please connect your wallet")
    }

    const payload = await generatePayload({address: account.address})
    const signatureRes = await signLoginPayload({account, payload})
    const res = await updateUser(jwt.ctx.id,signatureRes,formData)
    console.log("res: ",res)
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Crear un objeto FormData a partir del formulario
    const formData = new FormData(event.currentTarget);

    // Pasar formData a la función handleClick
    handleClick(formData);
  }

  return (
    <div>
      <CConectButton />
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="flex h-20 items-center space-x-4">
        <div className="flex space-x-10 h-20 items-center">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Nick
          </label>
          <input
            type="text"
            id="nick"
            name="nick"

            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="flex space-x-10 h-20 items-center">
          <label htmlFor="solicitarAdmin" className="block font-medium text-gray-700">
            Solicitar Admin
          </label>
          <input
            type="checkbox"
            id="solicitarAdmin"
            name="solicitudAdmin"
            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <Button
        disabled={!account}
          type="submit"
          className="inline-flex items-center px-4 py-4 border border-transparent hover:border-gray-800  text-sm font-medium rounded-md shadow-sm shadow-gray-300 hover:shadow-lg text-gray-500 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Update Profile
        </Button>
      </form>
    </div>
  )
}