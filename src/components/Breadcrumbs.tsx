// src/components/Breadcrumbs.tsx
import React from "react";
import type { PageId } from "../context/NavigationContext";

type Crumb = {
  id: PageId;
  label: string;
  isCurrent?: boolean;
};

type BreadcrumbsProps = {
  items: Crumb[];
  onNavigate?: (pageId: PageId) => void;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  if (!items.length) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent === true;

          if (isCurrent) {
            return (
              <li
                key={item.id}
                className="breadcrumbs__item breadcrumbs__item--current"
                aria-current="page"
              >
                <span className="breadcrumbs__label">{item.label}</span>
                {!isLast && (
                  <span className="breadcrumbs__separator" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          }

          return (
            <li key={item.id} className="breadcrumbs__item">
              <button
                type="button"
                className="breadcrumbs__link"
                onClick={() => onNavigate?.(item.id)}
              >
                {item.label}
              </button>
              {!isLast && (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
