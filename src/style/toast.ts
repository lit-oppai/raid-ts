export default {
    container: ({ props }: { props: any }) => ({
        class: [
            'my-4 rounded-md w-full flex',
            '!border-l-0',
            'backdrop-blur-[10px] shadow-md',
            '!bg-white',
            '!text-gray-900',
            // icon
            {
                'before:!ml-5 before:!my-3.5 before:h-5 before:content-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIiBmaWxsPSIjRkQ1RjFDIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0LjI0MjYgNS43NTc3NkMxNC41MDI5IDYuMDE4MTEgMTQuNTAyOSA2LjQ0MDIyIDE0LjI0MjYgNi43MDA1N0w2LjcwMDA5IDE0LjI0M0M2LjQzOTc0IDE0LjUwMzQgNi4wMTc2MyAxNC41MDM0IDUuNzU3MjggMTQuMjQzQzUuNDk2OTMgMTMuOTgyNyA1LjQ5NjkzIDEzLjU2MDYgNS43NTcyOCAxMy4zMDAyTDEzLjI5OTggNS43NTc3NkMxMy41NjAxIDUuNDk3NDEgMTMuOTgyMiA1LjQ5NzQxIDE0LjI0MjYgNS43NTc3NloiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuNzU3MjcgNS43NTc3NkM2LjAxNzYyIDUuNDk3NDEgNi40Mzk3MyA1LjQ5NzQxIDYuNzAwMDggNS43NTc3NkwxNC4yNDI2IDEzLjMwMDJDMTQuNTAyOSAxMy41NjA2IDE0LjUwMjkgMTMuOTgyNyAxNC4yNDI2IDE0LjI0M0MxMy45ODIyIDE0LjUwMzQgMTMuNTYwMSAxNC41MDM0IDEzLjI5OTcgMTQuMjQzTDUuNzU3MjcgNi43MDA1N0M1LjQ5NjkyIDYuNDQwMjIgNS40OTY5MiA2LjAxODExIDUuNzU3MjcgNS43NTc3NloiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==")]':
                    props.message.severity == 'error',
                'before:!ml-5 before:!my-3.5 before:h-5 before:content-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIiBmaWxsPSIjMjhDMzIyIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1LjgwNDggNi4xOTUyNkMxNi4wNjUyIDYuNDU1NjEgMTYuMDY1MiA2Ljg3NzcyIDE1LjgwNDggNy4xMzgwN0w5LjEzODE1IDEzLjgwNDdDOS4wMTMxMyAxMy45Mjk4IDguODQzNTYgMTQgOC42NjY3NSAxNEM4LjQ4OTk0IDE0IDguMzIwMzcgMTMuOTI5OCA4LjE5NTM0IDEzLjgwNDdMNC44NjIwMSAxMC40NzE0QzQuNjAxNjYgMTAuMjExMSA0LjYwMTY2IDkuNzg4OTUgNC44NjIwMSA5LjUyODZDNS4xMjIzNiA5LjI2ODI1IDUuNTQ0NDcgOS4yNjgyNSA1LjgwNDgyIDkuNTI4Nkw4LjY2Njc1IDEyLjM5MDVMMTQuODYyIDYuMTk1MjZDMTUuMTIyNCA1LjkzNDkxIDE1LjU0NDUgNS45MzQ5MSAxNS44MDQ4IDYuMTk1MjZaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=")]':
                    props.message.severity == 'success',
                'before:!ml-5 before:!my-3.5 before:h-5 before:content-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIiBmaWxsPSIjRThBQjAyIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkuOTk5ODggNC42NjY5OUM5LjI3NTc4IDQuNjY2OTkgOC43MDAzNCA1LjI3NTI5IDguNzQwNTEgNS45OTgyN0w5LjA2MTY5IDExLjc3OTVDOS4wODkzNSAxMi4yNzc0IDkuNTAxMTggMTIuNjY3IDkuOTk5ODggMTIuNjY3QzEwLjQ5ODYgMTIuNjY3IDEwLjkxMDQgMTIuMjc3NCAxMC45MzgxIDExLjc3OTVMMTEuMjU5MyA1Ljk5ODI3QzExLjI5OTQgNS4yNzUyOSAxMC43MjQgNC42NjY5OSA5Ljk5OTg4IDQuNjY2OTlaIiBmaWxsPSJ3aGl0ZSIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05Ljk5OTg4IDE1LjMzMzdDMTAuNTUyMiAxNS4zMzM3IDEwLjk5OTkgMTQuODg1OSAxMC45OTk5IDE0LjMzMzdDMTAuOTk5OSAxMy43ODE0IDEwLjU1MjIgMTMuMzMzNyA5Ljk5OTg4IDEzLjMzMzdDOS40NDc2IDEzLjMzMzcgOC45OTk4OCAxMy43ODE0IDguOTk5ODggMTQuMzMzN0M4Ljk5OTg4IDE0Ljg4NTkgOS40NDc2IDE1LjMzMzcgOS45OTk4OCAxNS4zMzM3WiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K")]':
                    props.message.severity == 'warn'
            }
        ]
    }),
        content: {
        class: '!pl-2 !pr-5 !py-3.5 !border-l-0'
    },
    icon: {
        class: [
            // Sizing and Spacing
            '!hidden'
        ]
    },
    text: {
        class: [
            // Font and Text
            'text-sm leading-5',
            '!ml-0'
        ]
    },
    summary: {
        // class: '!hidden'
    },
    detail: {
        class: '!mt-0'
    },
    closebutton: {
        class: ['!hidden']
    }
}
