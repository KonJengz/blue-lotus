"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

/** A single review, already localized to the active language by the server. */
export interface DisplayReview {
  name: string;
  text: string;
}

function getReviewId(review: DisplayReview, index: number) {
  return `${review.name}-${index}`;
}

/** Column count matched to the Tailwind md / lg breakpoints. */
function columnsForWidth(width: number) {
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3;
}

interface ReviewsGridProps {
  reviews: DisplayReview[];
  sourceText: string;
  readMoreText: string;
  readLessText: string;
  /** Optional cap (e.g. the home page shows 3). */
  limit?: number;
}

export function ReviewsGrid({
  reviews,
  sourceText,
  readMoreText,
  readLessText,
  limit,
}: ReviewsGridProps) {
  const [visibleReviews, setVisibleReviews] = useState<DisplayReview[]>(
    limit ? reviews.slice(0, limit) : reviews
  );

  // Randomize order on the client for variety. Initial state matches the server
  // render (stable order) to avoid a hydration mismatch; we reshuffle once mounted.
  useEffect(() => {
    const shuffled = [...reviews].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only randomization
    setVisibleReviews(limit ? shuffled.slice(0, limit) : shuffled);
  }, [reviews, limit]);

  // Responsive column count for the masonry layout.
  const [columnCount, setColumnCount] = useState(3);
  useEffect(() => {
    const apply = () => {
      setColumnCount(columnsForWidth(window.innerWidth));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});
  const [expandableReviews, setExpandableReviews] = useState<
    Record<string, boolean>
  >({});
  const quoteRefs = useRef<Record<string, HTMLQuoteElement | null>>({});

  // Only show "Read more" when the text is actually clamped.
  useEffect(() => {
    let frameId = 0;
    const measureExpandableReviews = () => {
      const nextExpandableReviews: Record<string, boolean> = {};

      visibleReviews.forEach((review, index) => {
        const reviewId = getReviewId(review, index);
        const element = quoteRefs.current[reviewId];
        if (element) {
          nextExpandableReviews[reviewId] =
            element.scrollHeight > element.clientHeight + 1;
        }
      });

      setExpandableReviews(nextExpandableReviews);
    };
    const scheduleMeasurement = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measureExpandableReviews);
    };

    scheduleMeasurement();
    window.addEventListener("resize", scheduleMeasurement);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleMeasurement);
    };
  }, [visibleReviews, columnCount]);

  // Distribute reviews across N columns (round-robin) so columns are top-aligned
  // with no gaps; expanding a card only shifts cards below it in its own column.
  const columns: { review: DisplayReview; index: number }[][] = Array.from(
    { length: columnCount },
    () => []
  );
  visibleReviews.forEach((review, index) => {
    columns[index % columnCount].push({ review, index });
  });

  return (
    <div className="flex items-start gap-6">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex min-w-0 flex-1 flex-col gap-6"
        >
          {column.map(({ review, index }) => {
            const reviewId = getReviewId(review, index);
            const isExpanded = expandedReviews[reviewId] ?? false;

            return (
              <div
                key={reviewId}
                className="flex flex-col rounded-lg border border-border bg-surface p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] animate-in fade-in duration-500"
              >
                <div className="flex-1">
                  <div className="flex gap-1 text-accent">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote
                    ref={(element) => {
                      quoteRefs.current[reviewId] = element;
                    }}
                    className={`mt-6 text-sm leading-relaxed text-foreground italic whitespace-pre-wrap ${
                      isExpanded
                        ? ""
                        : "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
                    }`}
                  >
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  {(expandableReviews[reviewId] || isExpanded) && (
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      className="mt-4 inline-flex w-fit text-sm font-semibold text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      onClick={() =>
                        setExpandedReviews((current) => ({
                          ...current,
                          [reviewId]: !isExpanded,
                        }))
                      }
                    >
                      {isExpanded ? readLessText : readMoreText}
                    </button>
                  )}
                </div>
                <div className="mt-8 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">{sourceText}</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
