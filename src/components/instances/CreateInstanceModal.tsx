'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useInstancesStore } from '@/lib/store/instances';

const instanceSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  instanceType: z.string().min(1, 'インスタンスタイプを選択してください'),
});

type InstanceFormData = z.infer<typeof instanceSchema>;

const instanceTypes = [
  { id: 't3.micro', name: 'Micro (1 vCPU, 1GB RAM)', description: '開発・テスト用' },
  { id: 't3.small', name: 'Small (2 vCPU, 2GB RAM)', description: '小規模アプリケーション' },
  { id: 't3.medium', name: 'Medium (2 vCPU, 4GB RAM)', description: '中規模アプリケーション' },
];

interface CreateInstanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateInstanceModal({ isOpen, onClose }: CreateInstanceModalProps) {
  const [error, setError] = useState('');
  const { createInstance } = useInstancesStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InstanceFormData>({
    resolver: zodResolver(instanceSchema),
  });

  const onSubmit = async (data: InstanceFormData) => {
    try {
      setError('');
      await createInstance(data.name, data.instanceType);
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '作成中にエラーが発生しました');
    }
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      新しいインスタンスを作成
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        インスタンスの名前とタイプを選択してください。
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 sm:mt-6">
                  {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            {error}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        インスタンス名
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...register('name')}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="instanceType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        インスタンスタイプ
                      </label>
                      <div className="mt-1">
                        <select
                          {...register('instanceType')}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">選択してください</option>
                          {instanceTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name} - {type.description}
                            </option>
                          ))}
                        </select>
                        {errors.instanceType && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.instanceType.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {isSubmitting ? '作成中...' : '作成'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={onClose}
                    >
                      キャンセル
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}