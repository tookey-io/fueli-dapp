import {
  useFueliPicliMinterCostPerMessageByte,
  useFueliPicliMinterCostPerMint,
  useFueliPicliMinterCostPerPromptByte,
  useFueliPicliMinterMint,
} from "@/wagmi/generated";
import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  BarsArrowUpIcon,
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { BaseError, formatEther, parseEther } from "viem";
import { useWaitForTransaction } from "wagmi";
import { Button } from "./Button";
import { stringify } from "@/utils/stringify";
import { useMinterAddress } from "@/hooks/useMinterAddress";

const team = [
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Whitney Francis",
    email: "whitney.francis@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leonard Krasner",
    email: "leonard.krasner@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const MAX_DECIMALS = 4;

export function Minting() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [promptError, setPromptError] = useState<string | undefined>();
  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<string | undefined>();
  const [value, setValue] = useState<number>(0);
  const [valueError, setValueError] = useState<string | undefined>();

  const mintingArgs = useMemo(() => {
    return [prompt, message, false] as const;
  }, [prompt, message]);

  const weiValue = useMemo(() => parseEther(`${value}`, "wei"), [value]);
  const minterAddress = useMinterAddress();

  const { write, data, error, isLoading, isError } = useFueliPicliMinterMint({
    address: minterAddress,
    args: mintingArgs,
    value: weiValue,
  });

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const { data: messageCost } = useFueliPicliMinterCostPerMessageByte({
    address: minterAddress,
  });
  const { data: promptCost } = useFueliPicliMinterCostPerPromptByte({
    address: minterAddress,
  });
  const { data: baseCost } = useFueliPicliMinterCostPerMint({
    address: minterAddress,
  });

  const minValue = useMemo(() => {
    if (!messageCost || !promptCost || !baseCost) return undefined;

    const messageLengthCost = BigInt(message.length) * messageCost;
    const promptLengthCost = BigInt(prompt.length) * promptCost;

    return Number(
      formatEther(messageLengthCost + promptLengthCost + baseCost, "wei")
    );
  }, [prompt, message]);

  useEffect(() => {
    if (minValue && value < minValue) {
      setValue(minValue);
    }
  }, [minValue]);

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = event.target.value;

    if (newMessage.length > 100) {
      setMessageError("Message too long, max 100 characters");
      return;
    }

    setMessage(newMessage);
    setMessageError(undefined);
  };

  function handlePromptChange(event: ChangeEvent<HTMLInputElement>): void {
    const newPrompt = event.target.value;
    if (newPrompt.length > 50) {
      setPromptError("Prompt too long, max 50 characters");
      return;
    }

    setPrompt(newPrompt);
    setPromptError(undefined);
  }

  function handleValueChange(event: ChangeEvent<HTMLInputElement>): void {
    let newValue = Number(event.target.value);

    if (Number.isNaN(newValue)) {
      setValueError("Incorrect number");
      return;
    }

    if (minValue && newValue < minValue) {
      setValue(minValue);
      setValueError("Value is too low for provided message and prompt");
      return;
    }

    newValue = Math.floor(newValue * 10 ** MAX_DECIMALS) / 10 ** MAX_DECIMALS;

    setValue(newValue);
    setValueError(undefined);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessageError(undefined);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [messageError, message]);

  const handleMint = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    write();
  };

  useEffect(() => {
    console.log({
      write,
      data,
      error,
      isLoading,
      isError,
      receipt,
      isPending,
      isSuccess,
    });
  }, [
    stringify({
      write,
      data,
      error,
      isLoading,
      isError,
      receipt,
      isPending,
      isSuccess,
    }),
  ]);

  return (
    <>
      <Button onClick={() => setOpen(!open)} className="flex gap-x-2">
        <SparklesIcon width={24} />
        <span className="whitespace-nowrap">Start Fueling</span>
      </Button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="bg-blue-600 px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                New Fueling
                              </Dialog.Title>
                              <p className="text-sm text-gray-200">
                                Join the league of digital riches fueling Web3's
                                future or increase your effort.
                              </p>
                            </div>
                            <div className="flex h-7 items-center">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                          {/* Message */}
                          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="project-description"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Message
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <textarea
                                value={message}
                                onChange={handleMessageChange}
                                rows={2}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          {/* Project name */}
                          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Prompt
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                value={prompt}
                                onChange={handlePromptChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          {/* Value */}
                          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Donation
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <div className="mt-2 flex rounded-md shadow-sm">
                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UsersIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <input
                                    type="number"
                                    value={value}
                                    onChange={handleValueChange}
                                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Donation size"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setValue(value + 0.1)}
                                  className="relative -ml-px inline-flex items-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  +0.1
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setValue(value + 1)}
                                  className="relative -ml-px inline-flex items-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  +1
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setValue(value + 10)}
                                  className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  +10
                                </button>
                              </div>

                              <p
                                className="mt-2 text-sm text-red-600"
                                id="email-error"
                              >
                                Minimal for Prompt + Message
                              </p>

                              {/* <input
                              type="text"
                              name="project-name"
                              id="project-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            /> */}
                            </div>
                          </div>

                          {/* Privacy */}
                          {/* <fieldset className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <legend className="sr-only">Privacy</legend>
                            <div
                              className="text-sm font-medium leading-6 text-gray-900"
                              aria-hidden="true"
                            >
                              Privacy
                            </div>
                            <div className="space-y-5 sm:col-span-2">
                              <div className="space-y-5 sm:mt-0">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="public-access"
                                      name="privacy"
                                      aria-describedby="public-access-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="public-access"
                                      className="font-medium text-gray-900"
                                    >
                                      Public access
                                    </label>
                                    <p
                                      id="public-access-description"
                                      className="text-gray-500"
                                    >
                                      Everyone with the link will see this
                                      project
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="restricted-access"
                                      name="privacy"
                                      aria-describedby="restricted-access-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="restricted-access"
                                      className="font-medium text-gray-900"
                                    >
                                      Private to Project Members
                                    </label>
                                    <p
                                      id="restricted-access-description"
                                      className="text-gray-500"
                                    >
                                      Only members of this project would be able
                                      to access
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="private-access"
                                      name="privacy"
                                      aria-describedby="private-access-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="private-access"
                                      className="font-medium text-gray-900"
                                    >
                                      Private to you
                                    </label>
                                    <p
                                      id="private-access-description"
                                      className="text-gray-500"
                                    >
                                      You are the only one able to access this
                                      project
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <hr className="border-gray-200" />
                              <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <div>
                                  <a
                                    href="#"
                                    className="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                  >
                                    <LinkIcon
                                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                      aria-hidden="true"
                                    />
                                    <span>Copy link</span>
                                  </a>
                                </div>
                                <div>
                                  <a
                                    href="#"
                                    className="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900"
                                  >
                                    <QuestionMarkCircleIcon
                                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    <span>Learn more about sharing</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </fieldset> */}

                          <div>
                            {isLoading && <div>Check wallet...</div>}
                            {isPending && <div>Transaction pending...</div>}
                            {isSuccess && (
                              <>
                                <div>Transaction Hash: {data?.hash}</div>
                                <div>
                                  Transaction Receipt:{" "}
                                  <pre>{stringify(receipt, null, 2)}</pre>
                                </div>
                              </>
                            )}
                            {isError && (
                              <div>{(error as BaseError)?.shortMessage}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleMint}
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Mint
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
