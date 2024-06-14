import React, { useState } from "react";

const Searchbar = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="flex-shrink min-w-[450px]">
            <form
                className="flex items-center"
                action={`/search?q=${query}`}
                method="post"
            >
                <label className="sr-only">Tìm kiếm</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="voice-search"
                        name="voice-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                        placeholder="Nhập từ khóa..."
                        required
                    />
                    <span
                        // type="button"
                        className="flex absolute inset-y-0 right-0 items-center pr-3"
                    >
                        <svg
                            className="w-4 h-4 text-gray-500 hover:text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* <path
                                fill-rule="evenodd"
                                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                clip-rule="evenodd"
                            ></path> */}
                        </svg>
                    </span>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center py-2 w-44 justify-center ml-2 text-sm font-medium text-white bg-[#f02d34] rounded-lg border border-[#f02d34] hover:bg-[#cb4e52]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da6b6e]"
                >
                    <svg
                        className="mr-2 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                    <span> Tìm kiếm</span>
                </button>
            </form>
        </div>
    );
};

export default Searchbar;
