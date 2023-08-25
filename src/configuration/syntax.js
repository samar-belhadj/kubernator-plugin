export default {
  name: 'kubernetes',
  languageSettings: {
    id: 'kubernetes',
    extensions: ['.yaml', '.yml'],
    aliases: ['Kubernetes', 'kubernetes', 'k8s'],
    mimeTypes: ['string'],
  },
  languageConfiguration: {
    comments: {
      lineComment: '#',
      blockComment: ['#', '#'],
    },
    brackets: [
      ['(', ')'],
      ['{', '}'],
      ['[', ']'],
    ],
    colorizedBracketPairs: [
      ['(', ')'],
      ['{', '}'],
      ['[', ']'],
    ],
    autoClosingPairs: [
      { open: '(', close: ')' },
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: "'", close: "'", notIn: ['string'] },
      { open: '"', close: '"', notIn: ['string'] },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
  },
  tokenProvider: {
    keywords: ['kubernetes', 'apiVersion', 'kind', 'metadata', 'spec', 'containers', 'image', 'ports', 'resources', 'template', 'name', 'selector', 'memory', 'cpu',
      'labels', 'annotations', 'matchLabels', 'configMap', 'mountPath', 'isInitContainer', 'jobTemplate', 'persistentVolumeClaim', 'claimName', 'replicas', 'ephemeral',
      'app', 'volumes', 'volumeMounts', 'io', 'kubernetes', 'k8s', 'apps', 'batch', 'v1', 'v2', 'others', 'autoscaling', 'networking', 'containerPort', 'storage',
      'protocol', 'port', 'targetPort', 'externalIPs', 'type', 'nodePort', 'clusterIP', 'hostname', 'command', 'subdomain', 'rules', 'http', 'paths', 'pathType',
      'backend', 'service', 'number', 'path', 'ingressClassName', 'defaultBackend', 'resource', 'apiGroup', 'host', 'controller', 'parameters', 'scope', 'imagePullSecrets',
      'data', 'ingress', 'class', 'namespace', 'secret', 'nginx', 'tls', 'key', 'crt', 'hosts', 'secretName', 'instance', 'version', 'component', 'part', 'of', 'managed', 'by', 'defaultMode',
      'items', 'optional', 'initContainers', 'imagePullPolicy', 'workingDir', 'args', 'env', 'envFrom', 'ressources', 'requests', 'limits', 'readinessProbe', 'livenessProbe', 'httpGet', 'tcpSocket', 'exec', 'grpc',
      'scheme', 'initialDelaySeconds', 'periodSeconds', 'timeoutSeconds', 'successThreshold', 'failureThreshold', 'terminationGracePeriodSeconds'],

    specialKeywords: ['true', 'false', 'null'],

    operators: ['=', ':', '-', '>', '<', '>=', '<='],

    symbols: /[=><:]+/,

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        [/(?<=k8s \.)io/, 'string.quote'],

        [/[a-z_$][\w$]*/, {
          cases: {
            '@keywords': 'keyword',
            '@specialKeywords': 'type.identifier',
            '@default': 'identifier',
          },
        }],

        // strings 1st letter uppercase
        [/[A-Z][\w$]*/, 'string.quote'],
        // whitespace
        { include: '@whitespace' },
        // delimiters and operators
        [/[{}()[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, {
          cases: {
            '@operators': 'operator',
            '@default': '',
          },
        }],
        // numbers
        [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],
        // delimiter
        [/[;,.]/, 'delimiter'],
        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non terminated string
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
        // single character
        [/'[^\\']'/, 'string'],
        [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
        [/'/, 'string.invalid'],
      ],
      comment: [
        // match the body of the comment without the '/*'
        [/[^/*]+/, 'comment'],
        // match the start of a multiline comment
        [/\/\*/, 'comment', '@push'],
        // match the end of a multiline comment
        ['\\*/', 'comment', '@pop'],
        // match individual occurrences of the characters / or *
        [/[/*]/, 'comment'],
      ],
      string: [

        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      whitespace: [
        // match the space, tab , the return and new line
        [/[ \t\r\n]+/, 'white'],
        // match the beginning of a multimine comment
        [/\/\*/, 'comment', '@comment'],
        // match a single line comment starting with //
        [/\/\/.*$/, 'comment'],
        // match a single line comment starting with #
        [/#.*$/, 'comment'],
      ],
    },
  },
};
