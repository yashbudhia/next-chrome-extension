"use client";

import "@fontsource/cascadia-mono";
import Link from "next/link";

export default function TermsAndService() {
  return (
    <div className="font-mono flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4">Terms of Service</h1>

      <p>
        These Terms of Service govern your access to and use of our browser
        extension Refocus. By installing or using the Extension, you agree to be
        bound by these Terms. If you do not agree to these Terms, you may not
        use the Extension.
      </p>

      <h2 className="text-xl mt-4 mb-2">License</h2>
      <p className="mb-4">
        We grant you a limited, non-exclusive, non-transferable, revocable
        license to use the Extension for your personal or internal business
        purposes. You may not modify, distribute, sublicense, or create
        derivative works based on the Extension.
      </p>

      <h2 className="text-xl mt-4 mb-2">User Conduct</h2>
      <p className="mb-4">
        You agree not to use the Extension for any illegal, harmful, or
        disruptive purposes. You will not attempt to reverse engineer,
        decompile, or disassemble the Extension. You will not use the Extension
        to access or collect information from websites or users without their
        consent.
      </p>

      <h2 className="text-xl mt-4 mb-2">Disclaimer of Warranty</h2>
      <p className="mb-4">
        The Extension is provided "as is" without warranty of any kind, either
        express or implied, including but not limited to the implied warranties
        of merchantability and fitness for a particular purpose. We do not
        warrant that the Extension will be error-free or uninterrupted.
      </p>

      <h2 className="text-xl mt-4 mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        In no event shall we be liable for any indirect, incidental, special,
        consequential, or punitive damages arising out of or in connection with
        your use of the Extension.
      </p>

      <h2 className="text-xl mt-4 mb-2">Termination</h2>
      <p className="mb-4">
        We may terminate your access to the Extension at any time for any reason
        without notice.
      </p>

      <h2 className="text-xl mt-4 mb-2">Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms from time to time. We will notify you of any
        material changes by posting the updated Terms on our website or through
        the Extension.
      </p>

      <p className="mt-4">
        By using the Extension, you agree to these Terms of Service.
      </p>
    </div>
  );
}
