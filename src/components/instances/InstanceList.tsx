'use client';

import { useEffect } from 'react';
import { useInstancesStore } from '@/lib/store/instances';
import { PlayIcon, StopIcon, TrashIcon } from '@heroicons/react/24/outline';

export function InstanceList() {
  const { instances, fetchInstances, startInstance, stopInstance, deleteInstance } = useInstancesStore();

  useEffect(() => {
    fetchInstances();
  }, [fetchInstances]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Instances</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your OpenHands instances including their name, status, and type.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add instance
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {instances.map((instance) => (
                  <tr key={instance.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {instance.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          instance.status === 'running'
                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                            : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                        }`}
                      >
                        {instance.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{instance.instance_type}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <div className="flex justify-end space-x-2">
                        {instance.status === 'running' ? (
                          <button
                            onClick={() => stopInstance(instance.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <StopIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        ) : (
                          <button
                            onClick={() => startInstance(instance.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <PlayIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteInstance(instance.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}