import React from 'react';

export interface TreeNode {
  id: string;
  label: string;
  /** Override the default folder/file Phosphor icon */
  icon?: string;
  children?: TreeNode[];
}

export interface TreeProps {
  data: TreeNode[];
  /** Controlled set of expanded node ids */
  expanded?: string[];
  /** Uncontrolled initial expanded ids */
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Controlled selected id(s) — a single string in single-select mode, string[] in multiSelect mode */
  selected?: string | string[];
  onSelect?: (selected: string | string[]) => void;
  /** Allow Ctrl/Cmd-click to toggle multiple selected nodes. Default false. */
  multiSelect?: boolean;
  /** Show vertical guide lines connecting parent-child rows. Default true. */
  showLines?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

function normalizeSelected(selected: string | string[] | undefined): Set<string> {
  if (selected === undefined) return new Set();
  return Array.isArray(selected) ? new Set(selected) : new Set(selected ? [selected] : []);
}

interface TreeItemProps {
  node: TreeNode;
  depth: number;
  expandedSet: Set<string>;
  selectedSet: Set<string>;
  toggleExpand: (id: string) => void;
  selectNode: (id: string, additive: boolean) => void;
  showLines: boolean;
}

function TreeItem({ node, depth, expandedSet, selectedSet, toggleExpand, selectNode, showLines }: TreeItemProps) {
  const [hover, setHover] = React.useState(false);
  const hasChildren = !!node.children && node.children.length > 0;
  const isOpen = expandedSet.has(node.id);
  const isSelected = selectedSet.has(node.id);

  const handleRowClick = (e: React.MouseEvent) => {
    const additive = e.ctrlKey || e.metaKey;
    selectNode(node.id, additive);
    if (hasChildren) toggleExpand(node.id);
  };

  const handleCaretClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleExpand(node.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const additive = e.ctrlKey || e.metaKey;
      selectNode(node.id, additive);
      if (hasChildren) toggleExpand(node.id);
    } else if (e.key === 'ArrowRight') {
      if (hasChildren && !isOpen) {
        e.preventDefault();
        toggleExpand(node.id);
      }
    } else if (e.key === 'ArrowLeft') {
      if (hasChildren && isOpen) {
        e.preventDefault();
        toggleExpand(node.id);
      }
    }
  };

  const iconClass = node.icon
    ? node.icon
    : hasChildren
      ? (isOpen ? 'ph ph-folder-open' : 'ph ph-folder')
      : 'ph ph-file';
  const iconColor = hasChildren ? 'var(--primary)' : 'var(--text-secondary)';

  return (
    <div>
      <div
        role="treeitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-selected={isSelected}
        aria-level={depth + 1}
        tabIndex={0}
        onClick={handleRowClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
          padding: '6px 8px', paddingLeft: depth * 20 + 8,
          borderRadius: 'var(--radius-sm)', cursor: 'pointer',
          background: isSelected ? 'var(--background)' : hover ? 'var(--surface)' : 'transparent',
          transition: 'background var(--duration-fast) var(--ease-spatial)',
        }}
      >
        {hasChildren ? (
          <i
            className="ph ph-caret-right" aria-hidden="true"
            onClick={handleCaretClick}
            style={{
              fontSize: 12, flex: 'none', width: 16, textAlign: 'center',
              color: 'var(--text-secondary)',
              transform: isOpen ? 'rotate(90deg)' : 'none',
              transition: 'transform var(--duration-fast) var(--ease-spatial)',
            }}
          />
        ) : (
          <span style={{ width: 16, flex: 'none' }} aria-hidden="true" />
        )}
        <i className={iconClass} aria-hidden="true" style={{ fontSize: 16, flex: 'none', color: iconColor }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
          color: isSelected ? 'var(--primary)' : 'var(--on-surface)',
        }}>{node.label}</span>
      </div>
      {hasChildren && (
        <div style={{
          display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows var(--duration-base) var(--ease-spatial)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div
              role="group"
              style={showLines
                ? { marginLeft: 18, paddingLeft: 10, borderLeft: 'var(--border-width) solid var(--border)' }
                : undefined}
            >
              {node.children!.map((child) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  expandedSet={expandedSet}
                  selectedSet={selectedSet}
                  toggleExpand={toggleExpand}
                  selectNode={selectNode}
                  showLines={showLines}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Prima tree — a file-explorer-style nested collapsible list. Rows animate open/closed
 * via the Accordion grid-rows trick, support single or Ctrl/Cmd-click multi selection,
 * and default to folder/file Phosphor icons that flip with open state.
 */
export function Tree({
  data,
  expanded,
  defaultExpanded,
  onExpandedChange,
  selected,
  onSelect,
  multiSelect = false,
  showLines = true,
  style,
  className,
}: TreeProps) {
  const expandedControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
    () => new Set(defaultExpanded ?? []),
  );
  const expandedSet = expandedControlled ? new Set(expanded) : internalExpanded;

  const selectedControlled = selected !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<Set<string>>(() => new Set());
  const selectedSet = selectedControlled ? normalizeSelected(selected) : internalSelected;

  const toggleExpand = (id: string) => {
    const next = new Set(expandedSet);
    if (next.has(id)) next.delete(id); else next.add(id);
    if (!expandedControlled) setInternalExpanded(next);
    onExpandedChange && onExpandedChange(Array.from(next));
  };

  const selectNode = (id: string, additive: boolean) => {
    let next: Set<string>;
    if (multiSelect && additive) {
      next = new Set(selectedSet);
      if (next.has(id)) next.delete(id); else next.add(id);
    } else {
      next = new Set([id]);
    }
    if (!selectedControlled) setInternalSelected(next);
    if (onSelect) {
      onSelect(multiSelect ? Array.from(next) : (Array.from(next)[0] ?? ''));
    }
  };

  return (
    <div role="tree" className={className} style={style}>
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          depth={0}
          expandedSet={expandedSet}
          selectedSet={selectedSet}
          toggleExpand={toggleExpand}
          selectNode={selectNode}
          showLines={showLines}
        />
      ))}
    </div>
  );
}
