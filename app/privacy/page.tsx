"use client";

import "@fontsource/cascadia-mono";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="font-mono flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4">Privacy Policy</h1>

      <p>
        This extension Refocus is designed to enhance your browsing experience.
        We value your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, and share
        data related to your use of the Extension.
      </p>

      <h2 className="text-xl mt-4 mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          **Usage Data:** We may collect information about how you interact with
          the Extension, such as features used, websites visited, and button
          clicks. This helps us improve the Extension's functionality.
        </li>
        <li>
          **Tab Data:** To provide its core functionality, the Extension may
          access and modify the content of your browser tabs. This includes
          reading and modifying web page content and URLs.
        </li>
        <li>
          **Technical Data:** We may collect technical information, such as your
          browser type, operating system, and IP address. This helps us diagnose
          issues and optimize the Extension's performance.
        </li>
      </ul>

      <h2 className="text-xl mt-4 mb-2">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          **Improve and Personalize:** We use collected data to improve the
          Extension's features, fix bugs, and personalize your experience.
        </li>
        <li>
          **Analytics:** We may use aggregated and anonymized data for analytics
          purposes to understand trends and usage patterns.
        </li>
        <li>
          **Communication:** We may use your email address (if provided) to send
          you important updates or notifications related to the Extension.
        </li>
      </ul>

      <h2 className="text-xl mt-4 mb-2">Data Sharing</h2>
      <p className="mb-4">
        We do not sell or rent your personal information to third parties. We
        may share data with trusted service providers who assist us in operating
        and improving the Extension. These providers are bound by
        confidentiality agreements and are prohibited from using your data for
        any other purpose.
      </p>

      <h2 className="text-xl mt-4 mb-2">Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your information from
        unauthorized access, disclosure, alteration, or destruction. However, no
        method of transmission over the internet or electronic storage is 100%
        secure.
      </p>

      <h2 className="text-xl mt-4 mb-2">Your Choices</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          You can disable or uninstall the Extension at any time through your
          browser's extension settings.
        </li>
        <li>
          You can contact us to request access, correction, or deletion of your
          personal information.
        </li>
      </ul>

      <h2 className="text-xl mt-4 mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you
        of any material changes by posting the updated policy on our website or
        through the Extension.
      </p>

      <p className="mt-4">
        By using the Extension, you consent to the collection and use of your
        information as described in this Privacy Policy.
      </p>
    </div>
  );
}
