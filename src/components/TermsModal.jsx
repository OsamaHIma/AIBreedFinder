"use client";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Translate } from "translate-easy";

const TermsModal = ({ open, handleOpen }) => {
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-y-auto max-h-96 bg-stone-200 list-decimal dark:bg-gray-800"
      >
        <DialogHeader className="dark:text-slate-200">
          <Translate>Terms and Conditions</Translate>
        </DialogHeader>
        <DialogBody divider>
          <p className="my-3 dark:text-stone-100">
            <Translate>
              Please read these Terms and Conditions carefully before using the
              &quot;AI Breed Finder&quot; website. By accessing or using our website,
              you agree to be bound by these Terms and Conditions
            </Translate>
            .
          </p>
          <ol className="list-decimal pl-6 mt-4">
            <li className="my-3 dark:text-stone-100">
              <strong className="text-indigo-300">
                <Translate>Intellectual Property</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                All content, including text, graphics, images, logos, and
                software, on the &quot;AI Breed Finder&quot; website is protected by
                intellectual property laws and is the property of Tumor Scan or
                its licensors. You may not modify, reproduce, distribute, or
                transmit any content without prior written consent
              </Translate>
              .
            </li>
            <li className="my-3 dark:text-stone-100">
              <strong className="text-indigo-300">
                <Translate>Disclaimer of Warranty</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                The information provided on the &quot;AI Breed Finder&quot; website
                is for general informational purposes only. We do not guarantee
                the accuracy, completeness, or usefulness of the information.
                Any reliance you place on such information is strictly at your
                own risk
              </Translate>
              .
            </li>
            <li className="my-3 dark:text-stone-100">
              <strong className="text-indigo-300">
                <Translate>Limitation of Liability</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                &quot;AI Breed Finder&quot;, its affiliates, directors, employees, or
                agents shall not be liable for any direct, indirect, incidental,
                special, or consequential damages arising out of or in
                connection with your use of the website or the information
                provided
              </Translate>
              .
            </li>
            <li className="my-3 dark:text-stone-100">
              <strong className="text-indigo-300">
                <Translate>Third-Party Links</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                Our website may contain links to third-party websites. We do not
                endorse or assume any responsibility for the content, privacy
                practices, or accuracy of these websites. Your use of
                third-party websites is at your own risk
              </Translate>
              .
            </li>
            <li className="my-3 dark:text-stone-100">
              <strong className="text-indigo-300">
                <Translate>Governing Law</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of [Jurisdiction]. Any disputes arising
                out of or in connection with these Terms and Conditions shall be
                subject to the exclusive jurisdiction of the courts of
                [Jurisdiction]
              </Translate>
              .
            </li>
            <li className="my-3 dark:text-stone-100">
              <strong className="text-indigo-300">
                <Translate>Changes to the Terms and Conditions</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                We reserve the right to update or modify these Terms and
                Conditions at any time. Any changes will be effective
                immediately upon posting the revised Terms and Conditions on our
                website. Your continued use of the website after the posting of
                any changes constitutes your acceptance of the modified Terms
                and Conditions
              </Translate>
              .
            </li>
          </ol>
        </DialogBody>
        <DialogFooter>
          <Button className="bg-indigo-600" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default TermsModal;
