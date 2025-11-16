param([string]$file)

# Define a nova mensagem para o commit raiz
$msg = "Initial: Remoção de arquivos duplicados e adição do modo escuro"

Set-Content -Path $file -Value $msg -Force
