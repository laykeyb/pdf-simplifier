import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
  } from "@react-pdf/renderer";

  import Markdown from "markdown-to-jsx";
const styles = StyleSheet.create({
    page: {
      fontSize: 12,
      padding: 40,
      lineHeight: 1.5,
    },
    h1: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 20,
      color: "#000000",
    },
    h2: {
      fontSize: 18,
      fontWeight: 700,
      marginTop: 15,
      marginBottom: 10,
      color: "#333333",
    },
    h3: {
      fontSize: 14,
      fontWeight: 700,
      marginTop: 10,
      marginBottom: 8,
      color: "#666666",
    },
    paragraph: {
      marginBottom: 10,
    },
    link: {
      color: "#0000EE",
      textDecoration: "underline",
    },
    list: {
      marginLeft: 20,
      marginBottom: 10,
    },
    listItem: {
      marginBottom: 5,
    },
    bold: {
      fontWeight: 700,
    },
    italic: {
      fontStyle: "italic",
    },
    code: {
      backgroundColor: "#f4f4f4",
      padding: 5,
      borderRadius: 3,
      fontFamily: "Courier",
    },
  });
  
  // Custom PDF Markdown Renderer
  export const MarkdownPDF = ({ markdown }: { markdown: string }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <MarkdownContent markdown={markdown} />
      </Page>
    </Document>
  );
  
  // Markdown Content Component
  const MarkdownContent = ({ markdown }: { markdown: string }) => {
    // Custom renderer for @react-pdf/renderer
    type Children = { children: string };
    const components = {
      h1: (props: Children) => <Text style={styles.h1}>{props.children}</Text>,
      h2: (props: Children) => <Text style={styles.h2}>{props.children}</Text>,
      h3: (props: Children) => <Text style={styles.h3}>{props.children}</Text>,
      h4: (props: Children) => <Text style={styles.h3}>{props.children}</Text>,
      h5: (props: Children) => <Text style={styles.h3}>{props.children}</Text>,
      h6: (props: Children) => <Text style={styles.h3}>{props.children}</Text>,
      p: (props: Children) => (
        <Text style={styles.paragraph}>{props.children}</Text>
      ),
      a: (props: Children) => <Text style={styles.link}>{props.children}</Text>,
      strong: (props: Children) => (
        <Text style={styles.bold}>{props.children}</Text>
      ),
      em: (props: Children) => (
        <Text style={styles.italic}>{props.children}</Text>
      ),
      ul: (props: Children) => <View style={styles.list}>{props.children}</View>,
      ol: (props: Children) => <View style={styles.list}>{props.children}</View>,
      li: (props: Children) => (
        <Text style={styles.listItem}>{props.children}</Text>
      ),
      code: (props: Children) => (
        <Text style={styles.code}>{props.children}</Text>
      ),
    };
  
    return (
      <Markdown
        options={{
          overrides: components,
        }}
      >
        {markdown}
      </Markdown>
    );
  };