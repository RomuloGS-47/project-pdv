param([string]$file)

# Lê o arquivo de sequência do rebase e substitui apenas a primeira ocorrência de "pick" por "reword"
$text = Get-Content -Raw -Path $file
$pos = $text.IndexOf("pick ")
if ($pos -ge 0) {
    $text = $text.Substring(0, $pos) + "reword " + $text.Substring($pos + 5)
}
Set-Content -Path $file -Value $text
