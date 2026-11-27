import React from "react";

/**
 * Error Boundary / Limite de erro.
 *
 * PT: captura erros JavaScript em qualquer componente filho abaixo dele nesta
 * árvore, registra o erro e exibe um fallback em vez de desmontar toda a
 * árvore da aplicação. Isso evita que um erro no player de áudio faça o
 * conteúdo da página desaparecer completamente.
 *
 * EN: catches JavaScript errors anywhere in its child component tree, logs
 * the error, and displays a fallback instead of unmounting the entire
 * application tree. This prevents an audio player error from making the
 * whole page content disappear.
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  readonly state: { hasError: boolean } = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo): void {
    console.error(
      "[ErrorBoundary] Error captured:",
      error,
      errorInfo,
    );
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
