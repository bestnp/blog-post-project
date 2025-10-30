import React from "react";
import {
  AddRoundLight,
  BellLight,
  HappyLight,
  SearchLight,
  StarLight,
  FacebookIcon,
} from "@/icon/IconsAll";

const IconPropsTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-brown-50 p-8">
      <h1 className="text-3xl font-bold text-brown-600 mb-8">
        Icon Props Test - ทดสอบ Props ทั้งหมด
      </h1>

      {/* Test 1: Default Props */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-brown-600 mb-4">
          1. Default Props (width=24, height=24, currentColor="currentColor")
        </h2>
        <div className="flex gap-4 items-center">
          <AddRoundLight className="text-green-600" />
          <BellLight className="text-blue-600" />
          <HappyLight className="text-yellow-600" />
          <SearchLight className="text-purple-600" />
          <StarLight className="text-red-600" />
        </div>
      </section>

      {/* Test 2: Custom Width & Height */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-brown-600 mb-4">
          2. Custom Width & Height Props
        </h2>
        <div className="flex gap-4 items-center">
          <AddRoundLight width={16} height={16} className="text-green-600" />
          <BellLight width={32} height={32} className="text-blue-600" />
          <HappyLight width={48} height={48} className="text-yellow-600" />
          <SearchLight width={64} height={64} className="text-purple-600" />
          <StarLight width="80" height="80" className="text-red-600" />
        </div>
        <p className="text-sm text-brown-400 mt-2">
          Sizes: 16px, 32px, 48px, 64px, 80px
        </p>
      </section>

      {/* Test 3: Custom currentColor */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-brown-600 mb-4">
          3. Custom currentColor Prop (without className color)
        </h2>
        <div className="flex gap-4 items-center">
          <AddRoundLight width={40} height={40} currentColor="#10b981" />
          <BellLight width={40} height={40} currentColor="#3b82f6" />
          <HappyLight width={40} height={40} currentColor="#eab308" />
          <SearchLight width={40} height={40} currentColor="#a855f7" />
          <StarLight width={40} height={40} currentColor="#ef4444" />
        </div>
        <p className="text-sm text-brown-400 mt-2">
          Colors: Green #10b981, Blue #3b82f6, Yellow #eab308, Purple #a855f7,
          Red #ef4444
        </p>
      </section>

      {/* Test 4: Combined Props */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-brown-600 mb-4">
          4. Combined Props (width, height, currentColor, className)
        </h2>
        <div className="flex gap-4 items-center">
          <AddRoundLight
            width={56}
            height={56}
            currentColor="#059669"
            className="hover:opacity-70 transition-opacity cursor-pointer"
          />
          <BellLight
            width={56}
            height={56}
            currentColor="#2563eb"
            className="hover:opacity-70 transition-opacity cursor-pointer"
          />
          <HappyLight
            width={56}
            height={56}
            currentColor="#ca8a04"
            className="hover:opacity-70 transition-opacity cursor-pointer"
          />
        </div>
        <p className="text-sm text-brown-400 mt-2">
          Hover เพื่อดู transition effect
        </p>
      </section>

      {/* Test 5: Social Icons */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-brown-600 mb-4">
          5. Social Icons with Custom Props
        </h2>
        <div className="flex gap-4 items-center">
          <FacebookIcon width={32} height={32} className="text-[#1877f2]" />
          <FacebookIcon width={48} height={48} currentColor="#1877f2" />
          <FacebookIcon
            width={64}
            height={64}
            currentColor="#0e4f9a"
            className="hover:opacity-80 transition-opacity cursor-pointer"
          />
        </div>
        <p className="text-sm text-brown-400 mt-2">
          Sizes: 32px (className), 48px (currentColor), 64px (currentColor +
          hover)
        </p>
      </section>

      {/* Test 6: Additional SVG Props */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-brown-600 mb-4">
          6. Additional SVG Props (opacity, strokeWidth, etc.)
        </h2>
        <div className="flex gap-4 items-center">
          <HappyLight
            width={48}
            height={48}
            currentColor="#f59e0b"
            opacity={0.3}
          />
          <HappyLight
            width={48}
            height={48}
            currentColor="#f59e0b"
            opacity={0.6}
          />
          <HappyLight width={48} height={48} currentColor="#f59e0b" />
        </div>
        <p className="text-sm text-brown-400 mt-2">
          Opacity: 0.3, 0.6, 1.0 (default)
        </p>
      </section>

      {/* Test 7: Responsive Sizing */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-brown-600 mb-4">
          7. Responsive with className
        </h2>
        <div className="flex gap-4 items-center">
          <AddRoundLight className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-green-600" />
          <BellLight className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-blue-600" />
          <HappyLight className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-yellow-600" />
        </div>
        <p className="text-sm text-brown-400 mt-2">
          Resize browser to see responsive sizes (mobile: 24px, tablet: 32px,
          desktop: 48px)
        </p>
      </section>

      {/* Summary */}
      <section className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold text-green-800 mb-3">
          ✅ สรุปการทดสอบ
        </h2>
        <ul className="list-disc list-inside text-green-700 space-y-2">
          <li>✅ width prop - รับค่าเป็น number หรือ string</li>
          <li>✅ height prop - รับค่าเป็น number หรือ string</li>
          <li>✅ currentColor prop - รับค่าสี (hex, rgb, named colors)</li>
          <li>✅ className prop - รับ Tailwind classes</li>
          <li>
            ✅ รองรับ SVG props อื่นๆ เช่น opacity, strokeWidth (ผ่าน ...props)
          </li>
          <li>✅ TypeScript typing ครบถ้วน</li>
          <li>✅ รูปแบบเดียวกันทุก icon component</li>
        </ul>
      </section>
    </div>
  );
};

export default IconPropsTest;

