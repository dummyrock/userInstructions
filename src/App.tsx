import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import step01StartGrip from "./assets/01-start-grip.jpg";
import adjustedFirstGripImage from "./assets/adjustedfirstgrip.png";
import backstepImage from "./assets/backstep.png";
import offbalanceImage from "./assets/offbalance.jpg";
import getUnderneathImage from "./assets/getunderneath.jpg";
import getArmInSpotImage from "./assets/getarminspot.jpg";
import flipThemImage from "./assets/flipthem.jpg";
import "./App.css";

type InstructionMode = "nonAdjusted" | "adjusted";

type InstructionStep = {
  id: number;
  title: string;
  cardKataText: string;
  cardAdjustedText: string;
  modalKataText: string;
  modalAdjustedText: string;
  imageSide: "left" | "right";
  imageSrc: string;
  imageSrcAdjusted?: string;
  imageAlt: string;
};

const modeCopy: Record<
  InstructionMode,
  {
    heroTag: string;
    heroTitle: string;
    heroBody: string;
    sectionNote: string;
  }
> = {
  nonAdjusted: {
    heroTag: "Kata method sequence",
    heroTitle: "Ippon Seoi Nage: Non-Adjusted Version",
    heroBody:
      "A focused kata-style guide that uses the uploaded step images with standard baseline cues.",
    sectionNote:
      "This mode emphasizes textbook kata timing and structure using the provided step photos.",
  },
  adjusted: {
    heroTag: "Personalized variation",
    heroTitle: "Ippon Seoi Nage: Adjusted Version",
    heroBody:
      "This sleeve-first variation uses a backward pull step, adds the second arm grip during load, and finishes by driving the far shoulder into the chest.",
    sectionNote:
      "This mode follows the adjusted sequence and coaching cues while keeping the same throw structure.",
  },
};

const introCards = [
  {
    title: "Audience and purpose",
    body: "Public audience with no formal judo coaching. Focus is on readable sequence logic, safe language, and clear terms.",
  },
  {
    title: "Safety first",
    body: "Practice only on mats with a partner who can breakfall. These instructions support supervised training and never replace qualified coaching.",
  },
];

const imageSourceUrl = "https://www.viseuacademiadejudo.pt/ippon-seoi-nage/";

const steps: InstructionStep[] = [
  {
    id: 1,
    title: "Start stance and grip",
    cardKataText:
      "The practitioner stands directly across from the partner with feet shoulder-width apart and knees slightly soft. Posture remains tall while one hand establishes sleeve control and the other hand takes the opposite-side lapel.",
    cardAdjustedText:
      "The practitioner starts square with the partner and takes only a sleeve grip first. The lapel or arm grip is not taken yet.",
    modalKataText:
      "The practitioner stands across from the partner with feet shoulder-width apart, posture upright, and weight centered. One hand controls the sleeve and the other hand controls the opposite-side lapel before initiating movement.",
    modalAdjustedText:
      "The adjusted sequence begins from a balanced stance with only the sleeve grip connected. The free hand stays ready while posture remains upright to prepare the backward pull entry on the next movement.",
    imageSide: "right",
    imageSrc: step01StartGrip,
    imageSrcAdjusted: adjustedFirstGripImage,
    imageAlt: "Step 1 line drawing of face-to-face stance with sleeve and lapel grips.",
  },
  {
    id: 2,
    title: "Kuzushi and pull-in",
    cardKataText:
      "Kuzushi is created by drawing the sleeve forward while lifting the lapel line up and slightly ahead. The goal is to shift the partner's balance onto the front of the feet before turning begins.",
    cardAdjustedText:
      "Instead of stepping forward, the practitioner steps backward behind the stance while pulling the sleeve to bring the partner in.",
    modalKataText:
      "Off-balance is established first, then entry follows. Shoulders stay relaxed and elbows stay connected to the torso so pulling force comes from the full frame rather than only the arms. The sleeve pull and lapel lift move uke's center clearly forward before rotation.",
    modalAdjustedText:
      "In the adjusted sequence, kuzushi is created by retreating one step backward and drawing uke in with the sleeve grip. This pull-back entry loads incoming momentum and prepares the second-hand arm connection.",
    imageSide: "left",
    imageSrc: offbalanceImage,
    imageSrcAdjusted: backstepImage,
    imageAlt: "Step 2 off-balance moment before the entry.",
  },
  {
    id: 3,
    title: "Entry and fit",
    cardKataText:
      "The practitioner steps in deeply and rotates so the back fits tightly under the partner's center. Feet stay active and close to the mat, and space between the back and the partner's chest line is removed.",
    cardAdjustedText:
      "As the partner is pulled in, the second hand is placed on the arm and the load is set onto the practitioner's back.",
    modalKataText:
      "Entry is driven with commitment, pivoted smoothly, and fitted compactly under uke. Knees bend to support the load while the spine stays upright and the head stays level. A clean fit feels connected, balanced, and ready for projection.",
    modalAdjustedText:
      "After the backward pull brings uke forward, the other hand secures the arm and the fit underneath is completed in one continuous action. Hips and back stay tight so the load remains compact and stable before the turn.",
    imageSide: "right",
    imageSrc: getUnderneathImage,
    imageAlt: "Step 3 entry where tori moves underneath uke.",
  },
  {
    id: 4,
    title: "Projection and ukemi",
    cardKataText:
      "The pull-and-turn action continues without pause so the partner travels forward in a controlled arc. Direction is guided through the hands while structure is maintained so uke can take proper breakfall safely.",
    cardAdjustedText:
      "When the turn reaches the finish, the far shoulder is driven into uke's chest to complete the throw.",
    modalKataText:
      "Rotation stays continuous through the throw so projection remains smooth and controlled. The end of the turn carries uke through the arc rather than forcing the throw with a sudden arm yank. Clean direction and safe ukemi are prioritized.",
    modalAdjustedText:
      "During rotation through the finish, the practitioner drives the far shoulder into uke's chest (for a right-sided throw, the left shoulder). This shoulder cue keeps rotation committed and directs projection cleanly.",
    imageSide: "left",
    imageSrc: getArmInSpotImage,
    imageAlt: "Step 4 projection phase with arm placement during throw.",
  },
  {
    id: 5,
    title: "Kata finish and control",
    cardKataText:
      "The finish remains balanced with awareness of the partner's landing, followed by a stable end posture. The chest stays upright and footwork stays controlled to show a complete and composed kata finish.",
    cardAdjustedText:
      "The adjusted finish stays controlled and balanced after projection, then recovers to stance without collapsing forward.",
    modalKataText:
      "The throw is completed with composure and stable posture after projection. In kata, the ending posture is part of technical quality, so collapsing forward or stepping out of control is avoided. The technique ends only when position is clean and balanced.",
    modalAdjustedText:
      "The adjusted sequence completes the throw and returns to stable stance while maintaining posture and awareness of the partner. The finish remains organized so the variation still ends with control and balance.",
    imageSide: "right",
    imageSrc: flipThemImage,
    imageAlt: "Step 5 finishing position after throw completion.",
  },
];

function getImageForMode(step: InstructionStep, mode: InstructionMode): string {
  if (mode === "adjusted" && step.imageSrcAdjusted) {
    return step.imageSrcAdjusted;
  }
  return step.imageSrc;
}

function StepPhoto({
  step,
  mode,
  context,
}: {
  step: InstructionStep;
  mode: InstructionMode;
  context: "card" | "modal";
}) {
  const [hasError, setHasError] = useState(false);
  const activeImageSrc = getImageForMode(step, mode);

  useEffect(() => {
    let isActive = true;
    const image = new Image();
    image.onload = () => {
      if (isActive) {
        setHasError(false);
      }
    };
    image.onerror = () => {
      if (isActive) {
        setHasError(true);
      }
    };
    image.src = activeImageSrc;

    return () => {
      isActive = false;
    };
  }, [activeImageSrc]);

  return (
    <div className={`photo-frame photo-frame-${context}`}>
      {!hasError ? (
        <img src={activeImageSrc} alt={step.imageAlt} loading="lazy" />
      ) : (
        <div className="photo-placeholder">
          <p className="photo-placeholder-title">Image not found</p>
          <p className="photo-placeholder-path">{activeImageSrc}</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<InstructionMode>("nonAdjusted");
  const [selectedStep, setSelectedStep] = useState<InstructionStep | null>(null);
  const activeMode = modeCopy[mode];

  useEffect(() => {
    if (!selectedStep) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedStep(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedStep]);

  return (
    <div className={`page-shell theme-inspired ${selectedStep ? "modal-open" : ""}`}>
      <div className="content-shell">
        <header className="hero">
          <div className="container">
            <div className="template-switch" role="tablist" aria-label="Instruction mode">
              <button
                className={`template-button ${mode === "nonAdjusted" ? "active" : ""}`}
                onClick={() => setMode("nonAdjusted")}
                role="tab"
                aria-selected={mode === "nonAdjusted"}
              >
                Non-Adjusted (Kata)
              </button>
              <button
                className={`template-button ${mode === "adjusted" ? "active" : ""}`}
                onClick={() => setMode("adjusted")}
                role="tab"
                aria-selected={mode === "adjusted"}
              >
                Adjusted
              </button>
            </div>

            <div className="hero-grid">
              <div>
                <p className="hero-tag">{activeMode.heroTag}</p>
                <h1>{activeMode.heroTitle}</h1>
                <p className="hero-body">{activeMode.heroBody}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container">
          <section className="info-grid">
            {introCards.map((card) => (
              <article className="surface-card" key={card.title}>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
              </article>
            ))}
          </section>

          <section className="section-block">
            <div className="section-head">
              <div>
                <p className="kicker">Technique Sequence</p>
                <h2>Ippon Seoi Nage from face-to-face kata setup</h2>
              </div>
              <p className="section-note">{activeMode.sectionNote}</p>
            </div>

            <div className="step-grid">
              {steps.map((step) => (
                <motion.article
                  key={step.id}
                  className="step-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: step.id * 0.04 }}
                >
                  <button onClick={() => setSelectedStep(step)} className="step-card-button">
                    <div className="step-image-wrap">
                      <StepPhoto step={step} mode={mode} context="card" />
                      <span className="step-number">Step {String(step.id).padStart(2, "0")}</span>
                    </div>
                    <div className="step-copy">
                      <h3>{step.title}</h3>
                      <p>
                        {mode === "nonAdjusted" ? step.cardKataText : step.cardAdjustedText}
                      </p>
                    </div>
                  </button>
                </motion.article>
              ))}
            </div>
          </section>
        </main>
        <footer className="source-footer">
          <div className="container">
            <p>
              Image citation: Images generated by the author with AI (ChatGPT), inspired by{" "}
              <a href={imageSourceUrl} target="_blank" rel="noreferrer">
                Viseu Academia de Judo - Ippon Seoi Nage
              </a>
              .
            </p>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStep(null)}
          >
            <motion.section
              className="modal-shell"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedStep(null)}
                aria-label="Close step details"
              >
                <X size={18} />
              </button>
              <div className={`modal-grid image-${selectedStep.imageSide}`}>
                <div className="modal-photo-pane">
                  <StepPhoto step={selectedStep} mode={mode} context="modal" />
                </div>
                <div className="modal-copy-pane">
                  <p className="kicker">Step {String(selectedStep.id).padStart(2, "0")}</p>
                  <h3>{selectedStep.title}</h3>
                  <p className="modal-subhead">
                    {mode === "nonAdjusted" ? "Kata text" : "Adjusted text"}
                  </p>
                  <p>
                    {mode === "nonAdjusted"
                      ? selectedStep.modalKataText
                      : selectedStep.modalAdjustedText}
                  </p>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
