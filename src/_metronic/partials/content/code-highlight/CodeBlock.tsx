import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/shadesOfPurple';
import React, { useEffect, useRef, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type Props = {
  code: string;
  language: Language;
};

const CodeBlock: React.FC<Props> = ({ code, language }) => {
  const codeRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) {
      return;
    }

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [copied]);

  useEffect(() => {
    if (!codeRef.current) {
      return;
    }

    const prismCodeElement = codeRef.current.querySelector('.prism-code ') as HTMLDivElement;
    if (prismCodeElement) {
      prismCodeElement.style.background = 'none';
      prismCodeElement.style.fontSize = '13px';
    }
  }, []);

  return (
    <div className="py-5">
      <div className="highlight">
        <OverlayTrigger
          key="copy-to-clipboard"
          overlay={<Tooltip id="tooltip-copy-to-clipboard">Copy Code</Tooltip>}
          placement="top"
        >
          <CopyToClipboard onCopy={() => setCopied(true)} text={code}>
            <a className="highlight-copy btn">{copied ? 'copied' : 'copy'}</a>
          </CopyToClipboard>
        </OverlayTrigger>

        <div ref={codeRef} className="highlight-code">
          <Highlight {...defaultProps} code={code} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
              return (
                <pre className={className} style={{ maxHeight: '300px', ...style }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ key: i, line })}>
                      {line.map((token, key) => (
                        <span key={i} {...getTokenProps({ key, token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              );
            }}
          </Highlight>
        </div>
      </div>
    </div>
  );
};

export { CodeBlock };
