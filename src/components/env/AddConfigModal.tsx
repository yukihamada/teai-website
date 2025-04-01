'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Variable {
  key: string;
  value: string;
  description?: string;
}

interface AddConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (config: any) => void;
}

export function AddConfigModal({ isOpen, onClose, onAdd }: AddConfigModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [variables, setVariables] = useState<Variable[]>([{ key: '', value: '' }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/secure-configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create config');
      }

      const newConfig = await response.json();
      onAdd(newConfig);
      resetForm();
    } catch (error) {
      console.error('Failed to create config:', error);
      alert('設定の作成に失敗しました');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setVariables([{ key: '', value: '' }]);
  };

  const addVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const updateVariable = (index: number, field: keyof Variable, value: string) => {
    const newVariables = [...variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    setVariables(newVariables);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">閉じる</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                      新しい設定を追加
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          設定名
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          説明（オプション）
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={2}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          環境変数
                        </label>
                        <div className="mt-2 space-y-3">
                          {variables.map((variable, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                placeholder="キー"
                                value={variable.key}
                                onChange={(e) => updateVariable(index, 'key', e.target.value)}
                                className="block w-1/3 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                              />
                              <input
                                type="text"
                                placeholder="値"
                                value={variable.value}
                                onChange={(e) => updateVariable(index, 'value', e.target.value)}
                                className="block w-1/2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                              />
                              <button
                                type="button"
                                onClick={() => removeVariable(index)}
                                className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={addVariable}
                          className="mt-3 inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                        >
                          <PlusIcon className="mr-1 h-4 w-4" />
                          変数を追加
                        </button>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        >
                          作成
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          キャンセル
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}