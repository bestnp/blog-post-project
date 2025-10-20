import React from "react";
import Input from "@/components/ui/Input";
import AppButton from "@/components/ui/AppButton";
import { SearchLight } from "@/icon/IconsAll";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

export default function ArticleSection() {
  const [selected, setSelected] = React.useState("Highlight");

  return (
    <section className="w-full px-4 pt-6 pb-3 max-w-[1200px] mx-auto">
      <h3 className="text-h3 font-bold mb-4 text-brown-600">Latest articles</h3>
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {/* Search bar - Mobile */}
        <div className="w-full relative">
          <Input
            placeholder="Search"
            className="rounded-[8px] bg-white text-sm pr-10 border-brown-300 focus:ring-brown-200 focus:ring-2 transition h-[40px] w-full"
          />
          <span className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-brown-400 pointer-events-none">
            <SearchLight width={18} height={18} />
          </span>
        </div>
        
        {/* Category Filter - Mobile */}
        <div className="space-y-2">
          <p className="text-brown-600 text-body-sm font-medium">Category</p>
          <div className="relative">
            <select 
              value={selected} 
              onChange={(e) => setSelected(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-brown-300 bg-white text-brown-600 text-body-sm focus:ring-brown-200 focus:ring-2 focus:border-brown-300 appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex bg-brown-200 flex-row items-center justify-between rounded-[16px] py-4 px-8 lg:px-12 w-full min-h-[60px]">
        {/* Tabs Filter */}
        <div className="flex flex-row gap-6">
          {categories.map((cat) => (
            <AppButton
              key={cat}
              variant={selected === cat ? "selected" : "ghost"}
              onClick={() => setSelected(cat)}
              className="px-4 py-2"
            >
              {cat}
            </AppButton>
          ))}
        </div>
        {/* Search bar */}
        <div className="flex items-center w-[350px] relative">
          <Input
            placeholder="Search"
            className="rounded-[8px] bg-white text-body-lg pr-10 border-brown-300 focus:ring-brown-200 focus:ring-2 transition h-[40px] w-full"
          />
          <span className="absolute right-[12px] text-brown-400 pointer-events-none">
            <SearchLight width={20} height={20} />
          </span>
        </div>
      </div>
    </section>
  );
}
